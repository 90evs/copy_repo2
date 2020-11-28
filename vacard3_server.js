var fs = require('fs');
var http = require('http');
var server = http.createServer();
var client_current_id = 1;


var vaList = ["Aimi", "HikaruAkao", "ChinatsuAkasaki", "HimikaAkaneya", "SatomiAkesaka", "AyakaAsai", "MomoAsakura", "MadokaAsahina", "KanaAsumi", "SoraAmamiya", "SatomiArai", "ChikaAnzai", "YukaIguchi", "ShioriIzawa", "ShizukaIshigami", "YuiIshikawa", "KaoriIshihara", "KanaIchinose", "AyasaItou", "KanaeItou", "ShizukaItou", "MikuItou", "KikukoInoue", "HonokaInoue", "MarinaInoue", "AyakaImamura", "ManakaIwami", "SumireUesaka", "KanaUeda", "ReinaUeda", "AyaUchida", "MaayaUchida", "YumiUchiyama", "RumiOokubo", "NaomiOozora", "YukaOotsubo", "SaoriOonishi", "YuukoOono", "AyakaOohashi", "SayakaOohara", "NichikaOomori", "HitomiOowada", "YuiOgura", "AriOzawa", "ChiakiOmigawa", "AiKakuma", "EmiriKatou", "HisakoKanemoto", "AiKayano", "AyakoKawasumi", "MakiKawase", "EriKitamura", "IbukiKido", "AkariKitou", "HinaKino", "JuriKimura", "RieKugimiya", "TomoriKusunoki", "MisakiKuno", "MiyuKubota", "YurikaKubo", "TomoyoKurosawa", "YuukiKuwahara", "KotoriKoiwai", "HiyoriKouno", "MarikaKouno", "AoiKoga", "AmiKoshimizu", "MinakoKotobuki", "YuuKobayashi", "KonomiKohara", "MikakoKomatsu", "ReinaKondou", "ChiwaSaitou", "IoriSaeki", "MaayaSakamoto", "AyaneSakura", "SatomiSatou", "RinaSatou", "MiyukiSawashiro", "MiyuriShimabukuro", "ShinoShimoji", "HarukaShiraishi", "RieSuegara", "AyaSuzaki", "AinaSuzuki", "EriSuzuki", "MinoriSuzuki", "SayumiSuzushiro", "AyakaSuwa", "AsamiSeto", "YuuSerizawa", "SayakaSenbongi", "AkiraSekine", "YouTaichi", "AyahiTakagaki", "YuukiTakada", "MinamiTakahashi", "RieTakahashi", "NatsumiTakamori", "TomoyoTakayanagi", "AyanaTaketatsu", "AzusaTadokoro", "AimiTanaka", "MinamiTanaka", "AtsumiTanezaki", "RisaTaneda", "MutsumiTamura", "YukariTamura", "SakuraTange", "HarukaChisuga", "MinoriChihara", "MinamiTsuda", "HarukaTerui", "HisakoToujou", "NaoTouyama", "SoraTokui", "HarukaTomatsu", "MiyuTomita", "AkiToyosaki", "MoeToyota", "RikaNagae", "YukiNagaku", "JuriNagatsuma", "MariaNaganawa", "MaiNakahara", "KaoriNazuka", "ShiinaNatsukawa", "YoshinoNanjou", "AsukaNishi", "NozomiNishida", "ManamiNumakura", "MamikoNoto", "AiNonaka", "HitomiNabatame", "KanaHanazawa", "YumiriHanamori", "SaoriHayami", "SayuriHara", "SayakaHarada", "YokoHikasa", "RinaHidaka", "MisatoFukuen", "YukiyoFujii", "AkaneFujita", "SakiFujita", "MaiFuchigami", "YuiHorie", "RinaHonnizumi", "KaedeHondo", "RomiPark", "KaoriMaeda", "ErikoMatsui", "SatsumiMatsuda", "RisaeMatsuda", "ShioriMikami", "SachikaMisawa", "NanaMizuki", "KaoriMizuhashi", "InoriMinase", "SakiMinami", "SuzukoMimori", "SakiMiyashita", "YumeMiyamoto", "RieMurakawa", "SumireMorohoshi", "KiyonoYasuno", "SayuriYahagi", "MegumiYamaguchi", "NanamiYamashita", "HibikuYamamura", "NozomiYamamoto", "AoiYuuki", "MayuYoshioka", "YuuriYoshida", "HarukaYoshimura", "MadokaYonezawa", "YuukiWakai", "AzumiWaki", "AiFairouz", "Sarah EmiBridcutt", "Lynn ", "MAO "];
var deck_array;

function getRandomInt(min, max) { //The maximum is exclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function reset(){
  deck_array = new Array(vaList.length);
  for (var i = 0; i < deck_array.length; i++){
    deck_array[i] = i;
  }
  for (var i = 0; i < deck_array.length; i++){
    var rnd = getRandomInt(0, deck_array.length);
    var temp = deck_array[i];
    deck_array[i] = deck_array[rnd];
    deck_array[rnd] = temp;
  }
}

reset();

server.on('request', function (req, res) {
  var stream = fs.createReadStream('vacard3.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  stream.pipe(res);
});
var io = require('socket.io')(server);
server.listen(8000);

io.sockets.on('connection', function (socket) {
  console.log('connect')
  io.emit('init', { id: client_current_id++ });
  socket.on('client_img_click_down', function (data) {
    console.log('client_img_click_down', data);
    io.emit('server_img_click_down', data);
  });
  socket.on('client_img_click_move', function (data) {
    console.log('client_img_click_move', data);
    io.emit('server_img_click_move', data);
  });
  socket.on('client_draw_card', function (data) {
    console.log('client_draw_card', data);
    if (deck_array.length > 0){
      io.emit('server_draw_card', {id: data.id, va_id: deck_array.pop()});
    }
  });
  socket.on('client_reset', function (data) {
    console.log('client_reset', data);
    reset();
    io.emit('server_reset', data);
  });
  socket.on('debug_print', function (data) {
    console.log('debug_print', data);
  });

});
