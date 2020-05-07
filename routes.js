const genPdf = require('./index');
const Todo = require('./Todo.model');

/*const data = {
    info: [{
        title: 'Todo 1',
        done: true
    }, {
        title: 'Todo 2',
        done: true
    }, {
        title: 'Todo 3',
        done: false
    }]
};
*/

module.exports = (app) => {
    app.get('/pdf', async (req, res) => {
        const data = await Todo.find({});
        console.log(data);
        const doc = genPdf(data);
        return doc.pipe(res);
    });
}
