import formidable from 'formidable';

const fs = require('fs');
const path = require('path')
const dir = path.resolve('./')
let raw = fs.readFileSync(dir + '/data.json');
let posts = JSON.parse(raw);


export const config = {
    api: {
      bodyParser: false,
    },
}

export default async (req, res) => {
    const method = req.method 
    
    switch(method) {
        case 'GET':
            const {page , size} = req.query;
            let start_index = size * (page -1)
            let end_index = start_index + (size - 1)
           
            let photo_chunk = posts.photos.slice(start_index, (end_index + 1))
            let obj_posts = {
                title : posts.title,
                description : posts.description,
                photos : photo_chunk
            }

            res.status(200).json(obj_posts)
            break
        case 'POST': 
            var file_no_start = posts.photos.length
            const {title , description} = req.query;
            posts.title = title
            posts.description = description

            const form = new formidable.IncomingForm();
            form.uploadDir = "./public";
            form.keepExtensions = true;
            form.multiples = true;

            form.on("fileBegin", function(name, file) {
                file_no_start = file_no_start + 1
                posts.photos.push(file_no_start)
                file.path = form.uploadDir + "/" + file_no_start + ".jpg";
            })
            
            form.parse(req, (err, fields, files) => {
                console.log(err, fields, files);
            });

            form.once('end', () => {
                fs.writeFile(dir + '/data.json', JSON.stringify(posts), (e) => {
                    console.log(e)
                });
                res.status(200).json(posts)
            });

            break
        case 'DELETE':
            posts.title=''
            posts.description=''
            posts.photos = []
            fs.writeFileSync(dir + '/data.json', JSON.stringify(posts));

            res.status(200).json({
                status : 'post deleted'
           })
           break
        default:
            res.setHeader('Allow', [ 'GET', 'POST', 'DELETE'])
            
    }
}