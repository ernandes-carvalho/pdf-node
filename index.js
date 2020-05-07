const PdfKit = require('pdfkit');
const PdfTable = require('voilab-pdf-table');

const FitColumn = require('voilab-pdf-table/plugins/fitcolumn');
const fs = require('fs');

/*fs.unlink('files/doc.pdf', (err) => {
    if (err) throw err;
    console.log('was deleted');
});*/

const genHeader = (doc) => {
    doc.image('files/logo-top.png', 50, 40, {
        width: 80,
        height:30,
        align: 'left'
    });
    doc
        .fontSize(10)
        .text('Report 1', 450, 55, { align: 'right' })
        .moveDown();
};

const genBody = (doc, data) => {
    // const {info} = data;
    const table = new PdfTable(doc, {
        bottomMargin:20,
        pos: {
            x: 60,
            y: 80
        }
    });

    table
        .addPlugin(new FitColumn({
            column: '_id'
        })) 
        .addPlugin(new FitColumn({
            column: 'title'
        }))
        .addPlugin(new FitColumn({
            column: 'done'
        }))
        .addColumns([{
            id: '_id',
            header: 'ID',
            align: 'left',
            width: 80
            }, {
            id: 'title',
            header: 'Title',
            align: 'left',
            width: 150
            }, {
                id: 'done',
                header: 'Done?',
                align: 'right',
                width: 50,
                renderer: function(tb, data) {
                    return data.done === true ? 'Yes' : 'No'
                }
            }
        ])
        .onPageAdded(function(tb) {
            tb.addHeader();
        });
        table.addBody(data);
    doc.end();
    // let text_pdf = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    // doc
    // .fontSize(12)
    // .font('Times-Roman')
    // .text(text_pdf, {
    //     align: 'justify'
    // });
    // doc.image('files/logo-top.png', {
    //     width: 150,
    //     height:30
    // });
    //doc.pipe(fs.createWriteStream('files/doc.pdf'));
    // doc.end();
    return doc;
};

const genPdf = (data) => {
    const doc = new PdfKit();

    doc.info = {
        title: 'School of net PDF',
        author: 'Ernandes Carvalho',
        subject: 'Pdf study case'
    };

    genHeader(doc);
    genBody(doc, data);
    return doc;

};

module.exports = genPdf;
