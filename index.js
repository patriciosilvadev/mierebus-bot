require('./menu/functionMenu.js')();
const qrcode = require('qrcode-terminal');
const http = require('http');
const app = require('express');
var apo = app();
const { Client } = require('whatsapp-web.js');
const client = new Client();
const port = 3000;
const https = require('https');
const xml2js =  require('xml2js');
const parser = new xml2js.Parser({explicitArray:false, mergeAttrs : false});
const number = [62895326927698,6285238909939,6281231285592];
var hehe;

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
        
        if(message.body === 'berita terbaru' || message.body === 'Berita terbaru'){
            let req = https.get("https://www.timesindonesia.co.id/feed/all", function(res) {
                let data = '';
                let asd = '';

                res.on('data', function(stream) {
                    data += stream;  
                asd = data.item;
                });

                res.on('end', function(){
                    parser.parseString(data, function(error, result) {
                        if(error === null) {     

                        var i=0;
                        var hasillain='';
                        for(i=0;i<10;i++){
                            hasillain += '*'+result.rss.channel.item[i].title+'* \n'+result.rss.channel.item[i].guid+'\n\n' ;
                        }
                            headerB = headerBeritaTerbaru();
                            footer = footerBeritaTerbaru();
                            isichat = headerB+hasillain+footer;
                            message.reply(isichat);

                        }
                        else {
                            console.table(error);
                        }
                    });
                });
            });
        } if(message.body === 'halo' || message.body === 'Halo'){
            balas = header()+'\n'+menu()+'\n\n'+footerDefault();
            message.reply(balas);

        } if(message.body === 'Langganan' || message.body === 'langganan'){
            pesanLangganan = langganan()+'\n'+footer();
            message.reply(pesanLangganan);

        } if(message.body === 'Cari' || message.body === 'cari'){
            pesanCari = cariBerita() +'\n\n'+footer();
            message.reply(pesanCari);

        } if(message.body === 'daftar' || message.body === 'Daftar'){
            daftar = daftarLangganan()+'\n'+footer();
            message.reply(daftar);

<<<<<<< HEAD
        } if(message.body === 'Tidak' || message.body === 'tidak'){
            cp = 0341563566;
            punyaK = tidakPunyaKonten()+'\n'+cp+'\n\n'+footerDefault();
            message.reply(punyaK);

        } if(message.body === 'Media partner' || message.body === 'media partner'){
            isi = 'file sknya di taro sini'
            mediaP = mediaPartner()+'\n'+isi+'\n\n'+skMediaPartner()+'\n\n'+footer();
            message.reply(mediaP);

        } if(message.body === 'publikasi' || message.body === 'Publikasi'){
            pb = publikasi()+'\n\n'+footer();
            message.reply(pb);
        }
=======
        } if(message.body === 'cek status' || message.body === 'Cek status'){
            cekStatus = cekStatusLangganan()+'\n'+footer();
            message.reply(cekStatus);

        } if(message.body === 'Batal' || message.body === 'batal'){
            batal = batalLangganan()+'\n'+footer();
            message.reply(batal);
>>>>>>> 0b1492a493a46633ec6c6909100a8dae528b7067

        } if(message.body === 'Iklan' || message.body === 'iklan'){
            iklan = iklan()+'\n'+footer();
            message.reply(iklan);

        } if(message.body === 'Kontak' || message.body === 'kontak'){
            cp = 0341563566;
            kontak = kontakMarketing()+'\n'+cp+'\n\n'+footerDefault();
            message.reply(kontak);

        } if(message.body === 'cek slot' || message.body === 'Cek slot'){
            isi = 'ini adalah slot iklan hari ini'
            slot = isi+'\n\n'+cekSlot()+'\n\n'+footer();
            message.reply(slot);

        } if(message.body === 'front office' || message.body === 'Front office'){
            frontOf = "WISMA MAS ISMAN\n\nJalan Teuku Cik Ditiro No.34 Menteng Jakarta Pusat 10310.\nTelp/Fax (021) 21394119.\nEmail: redaksi@timesindonesia.co.id (khusus redaksi),\nads@timesindonesia.co.id (khusus iklan)"
            pb =  cekFrontOffice()+'\n\n'+frontOf+'\n\n'+footer();
            message.reply(pb);

        } 

        }); 

apo.get('/sendbynum', function (req, res) {
    var haha = req.query.body;
    var no = req.query.no+'@c.us';
    console.log(no);
    client.sendMessage(no,haha);
    res.end();
});

apo.get('/sendbatch', function (req, res){
    var urlberita = req.query.urlBerita;
    var header = header();
    var konten = urlberita;
    var footer = footerDefault();
    var chat = header+konten+footer;

for (i = 0; i < number.length; i++) {
	if(i<number.length){
	console.log(i);
	console.log(number.length);
	var newnumber = number[i]+'@c.us';
	client.sendMessage(newnumber, chat);
	}if(i==(number.length-1)){
	res.end();
	}
  }
});

client.initialize();

apo.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});