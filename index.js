const Discord = require("discord.js");
const bot = new Discord.Client();
let prefix = '!';
let shop = {
  'status': 1
};
let time = '18:00-22:00';
let scores = 0;
let scoreStore = {
  'ready': false,
  'score': 0,
  'us1': '',
  'us2': '',
  'us3': '',
  'us4': '',
  'us5': ''
};
let cha = '291149768397422593';
let admin = '502047145365471242';
let seller = '502047145365471242';
let stock = '';
bot.on("ready", () => {
    bot.user.setPresence({ game: { name: `คำสั่ง ${prefix}help | สร้างโดย Chakung#0785` }, type: 0 });
    console.log("[0] Back Shop bot online! Created by Chakung.");
    let chakung = bot.users.get(cha);
    let sell = bot.users.get(seller);
    let adm = bot.users.get(admin);
    let scoreStores = '';
    bot.channels.get('493277979074363394').fetchMessage('496976005903417344').then(message => {scoreStores = message.content;});
    let args = scoreStores.split(',,');
    for (let i = 1; i < args.length; i++)
    {
      setScore(args,i);
    }
    scoreStore.ready = true;
    scores = scoreStore.score;
    console.log(scoreStore);
    chakung.send('__Back Shop Online__ '+(new Date));
    sell.send('__Back Shop Online__ '+(new Date));
    adm.send('__Back Shop Online__ '+(new Date));
    setInterval(function(){
      let store = scoreStore.score+',,'+scoreStore.us1+',,'+scoreStore.us2+',,'+scoreStore.us3+',,'+scoreStore.us4+',,'+scoreStore.us5;
      bot.channels.get('493277979074363394').fetchMessage('496976005903417344').then(message => message.edit(store));
    }, 500000);
    setInterval(function(){
      bot.channels.get('493277979074363394').fetchMessage('510593716285865984').then(message => time = message);
    }, 500000);
});
function setScore(args,s) {
    if (s === 1)
      scoreStore.score = args[s];
    if (s === 2)
      scoreStore.us1 = args[s];
    if (s === 3)
      scoreStore.us2 = args[s];
    if (s === 4)
      scoreStore.us3 = args[s];
    if (s === 5)
      scoreStore.us4 = args[s];
    if (s === 6)
      scoreStore.us5 = args[s];
}
function updateScore(){
    scoreStore.us5 = scoreStore.us4;
    scoreStore.us4 = scoreStore.us3;
    scoreStore.us3 = scoreStore.us2;
    scoreStore.us2 = scoreStore.us1;
}
bot.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    var args = message.content.split(' ').slice(1);
    if(command === 'help') {
        const embed = new Discord.RichEmbed()
        .addField('รายการคำสั่ง',
        '**!help** : คำสั่งช่วยเหลือ\n'+
        '**!ping** : คำสั่งดูความเร็วของบอท\n'+
        '**!time** : คำสั่งดูเวลาเปิดร้าน\n'+
        '**!status** : คำสั่งดูสถานะว่าร้านเปิดหรือปิด\n'+
        '**!score** __[คะแนน]__ : คำสั่งสำหรับลูกค้าสามารถเพิ่มคะแนนให้ร้าน\n__ตัวอย่าง__ `!score 100`\n'+
        '**!credit** : ตรวจสอบข้อมูลคนสร้างบอท\n')
        .setColor(0x00ccff)
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'ping')
    {
        const embed = new Discord.RichEmbed()
        .addField('Ping','Process '+parseInt(bot.ping)+' ms')
        .setColor(0x00ffff)
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.send({embed:embed})
    }
    if (command === 'time')
    {
        const embed = new Discord.RichEmbed()
        .addField('เวลาทำการ', time)
        .setColor(0x00ff00)
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.send({embed:embed})
    }
    if (command === 'status')
    {
        if (shop.status === 1)
        {
          const embed = new Discord.RichEmbed()
          .setColor(0x00ff00)
          .addField('Status','ร้านเปิด')
          .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
          message.channel.send({embed:embed});
        }
        else
        {
          const embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .addField('Status','ร้านปิด')
          .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
          message.channel.send({embed:embed});
        }
    }
    if(command === 'score') {
        let ss = args.join(' ');
        if (!ss) return;
        let no = false;
        let ab = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'i' , 'j' , 'k' , 'l' , 'm' , 'n' , 'o' , 'p' , 'q' , 'r' , 's' , 't' , 'u' , 'v' , 'w' , 'x' , 'y' , 'z' ];
        ab.forEach((txt)=>{
            if (ss.includes(txt)) no = true;
        });
        let score = parseInt(ss);
        if (score === undefined) return message.reply('กรุณาใส่คะแนนให้ถูกต้อง');
        if (no) return message.reply('❌ ห้ามใส่ตัวอักษรในคำสั่งนี้!');
        if (ss.includes('+') || ss.includes('-') || ss.includes('*') || ss.includes('/')) return message.reply('❌ ใส่ตัวเลขผิด');
        if (score > 100) return message.reply('❌ คุณไม่สามารถให้คะแนนเกิน 100 ได้');
        scores += score;
        updateScore();
        let a2 = scoreStore.us2.split('=');
        let a3 = scoreStore.us3.split('=');
        let a4 = scoreStore.us4.split('=');
        let a5 = scoreStore.us5.split('=');
        scoreStore.us1 = `${message.author.username}=${score}`;
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username+' ให้คะแนนร้าน '+score+' คะแนน', message.author.avatarURL)
        .setTitle('Score ของร้าน Back Shop รวม ('+scores+') คะแนน')
        .setColor(0xff1689)
        .setImage(bot.user.avatarURL)
        .addField('ขอบคุณที่เพิ่มคะแนนให้ร้านของเรา',`__ผู้ที่ให้คะแนนล่าสุด__ \n[1] ${message.author.username} (${score}) คะแนน!\n[2] ${a2[0]} (${a2[1]}) คะแนน!\n[3] ${a3[0]} (${a3[1]}) คะแนน!\n[4] ${a4[0]} (${a4[1]}) คะแนน!\n[5] ${a5[0]} (${a5[1]}) คะแนน!`)
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.send({embed:embed});
    }
    if(command === 'credit') {
        let chakung = bot.users.get('291149768397422593');
        const embed = new Discord.RichEmbed()
        .setAuthor(chakung.username+' ผู้สร้างบอท', chakung.avatarURL)
        .setDescription('พัฒนาบอท Discord ด้วยภาษา Javascript รับเปิดบอท online 24 ชั่วโมง ราคาเริ่มต้นที่ 100 บาท')
        .setColor(0x3399ff)
        .setImage(url=chakung.avatarURL)
        .setURL('https://www.facebook.com/polite.cha')
        .addField('ติดต่อสอบถาม','Discord: Chakung#0785\nFacebook: [Polite Cha](https://fb.com/polite.cha)\nYoutube: [FriendRPG TV](https://www.youtube.com/c/friendrpgth)')
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.send({embed:embed});
    }
});

bot.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    let owner = message.author.id;
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    var args = message.content.split(' ').slice(1);
    if (command === 'settime')
    {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== cha) return message.reply(`❌ คุณไม่ได้รับอนุญาติให้ใช้คำสั่ง ~~${message.content}~~`);
        time = args.join(' ');
        bot.channels.get('493277979074363394').fetchMessage('510593716285865984').then(message => message.edit(time));
        const embed = new Discord.RichEmbed()
        .addField('Time setting','เวลา : '+time)
        .setColor(0xffffff)
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.send({embed:embed})
    }
    if (command === 'restart')
    {
      if (!message.member.hasPermission(['ADMINISTRATOR']) && message.author.id !== admin) return message.reply('⚠ คุณไม่สามารถใช้คำสั่งนี้ได้');
      message.channel.send('ขอ Restart ก่อนนะครับ')
      .then(message => bot.users.get(cha).send(scoreStore))
      .then(message => bot.destroy())
      .then(message => bot.login(process.env.token));
    }
    if (command === 'setscore')
    {
        message.delete()
        scores = args.join(' ');
    }
    if (command === 'stock') {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        let pet = args.join(' ');
        const embed = new Discord.RichEmbed()
        .setColor(0x886688)
        .addField(`Stock ${pet}`,`สามารถทักหา <@${seller}> เพื่อซื้อนะครับ`)
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.send({embed:embed})
        .then(message => {
            message.channel.send(`@everyone ตอนนี้ Stock มีอยู่ ${pet}`);
        });
    }
    if (command === 'everyone') {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        message.guild.members.forEach(member=>{
            bot.users.get(member.id).send(args.slice(0).join(' '));
        })
    }
    if (command === 'admin') {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        const embed = new Discord.RichEmbed()
        .setColor(0xfff000)
        .addField('รายการคำสั่งสำหรับคนขาย',
        '**!open** : คำสั่งเปิดร้าน\n\n'+
        '**!close** : คำสั่งปิดร้าน\n\n'+
        '**!say** __[ข้อความ]__ : บอทพิมพ์ข้อความตามที่เราพิมพ์\n'+
        '__-ตัวอย่าง__ `!say สวัสดี`\n\n'+
        '**!embed** __[สีเลข6ตัว]__ __[หัวข้อ]__ __[เนื้อหา]__ : บอทจะส่งข้อความแบบมีกรอบ\n'+
        '__-ตัวอย่าง__ `!embed 00ff00 ประกาศ วันนี้แอดมินไม่อยู่ ` *(กรุณาเว้นวรรคให้ถูกต้อง)*\n\n'+
        '**!stock** __[จำนวน]__ : คำสั่ง Stock ที่เหลือในร้าน\n'+
        '__-ตัวอย่าง__ `!stock 20`\n\n'+
        '**!settime __[เวลาเปิดปิด]__ : คำสั่งตั้งเวลาเปิด/ปิดร้าน\n'+
        '__-ตัวอย่าง__ `!settime 18:00-22:00`\n\n'+
        '**!everyone __[ข้อความ1-2000ตัวอักษร]__ : คำสั่งส่งข้อความหาสมาชิกทุกคน\n'+
        '__-ตัวอย่าง__ `!everyone สวัสดีครับ วันนี้ร้านเปิดเวลา 20:00 น. เข้าร้านที่นี้ #แชแนลร้าน`'+
        '')
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.sendEmbed(embed);
    }
    if (command === 'open')
    {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        shop.status = 1;
        const embed = new Discord.RichEmbed()
        .addField('Status','ร้านเปิด')
        .setColor(0x00ff00)
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.send({embed:embed})
        .then(message => {
            message.channel.send("@everyone"+` ร้านเปิดแล้วสามารถทักหาคนขาย <@${seller}> เพื่อซื้อนะครับ ของวางไว้ใน Stock แล้วนะครับ `);
        })
    }
    if (command === 'close')
    {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        shop.status = 0;
        const embed = new Discord.RichEmbed()
        .addField('Status','ร้านปิด')
        .setColor(0xff0000)
        .setFooter('Back Shop | สร้างโดย Chakung', bot.user.avatarURL)
        message.channel.send({embed:embed})
        .then(message => {
            message.channel.send("@everyone ร้านปิดแล้วนะครับ ไม่ควรทักหาคนขายนะครับ");
        })
    }
    if (command === 'say')
    {
        message.delete()
        message.channel.send(args.slice(0).join(' '));
    }
    if (command === 'embed')
    {
        message.delete()
        if (owner !== admin && owner !== cha) return message.reply('❌ ห้ามใช้คำสั่งนี้ คุณไม่ได้เป็นเจ้าของบอท');
        let field = '';
        let content = '';
        let color = '0xffffff';
        let colors = message.content.split(' ')[1];
        let fields = message.content.split(' ')[2];
        let contents = args.slice(2).join(' ');
        if (!colors || !fields || !contenrs) return;
        if (colors !== '')
            color = '0x' + colors;
        if (fields !== '')
            field = fields;
        if (contents !== '')
            content = contents;
        if (color.length > 8)
            color = '0x000000';
        const embed = new Discord.RichEmbed()
        .addField(field, content)
        .setColor(color)
        .setFooter('Back Shop', bot.user.avatarURL)
        .setTimestamp();
        message.channel.send({embed:embed});
    }
});
bot.login(process.env.token);