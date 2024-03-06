const menu = document.getElementById("menu")
const user_add = document.getElementById("user_add")
const licens_add = document.getElementById("licens_ad")
const search_user = document.getElementById("search_user")
const add_new = document.getElementById("add_new")
const licens = document.getElementById("licens")
const check = document.getElementById("check")
const searched_user = document.getElementById("searched_user")

const menu_select = function (el) {
    menu.style.display = 'none'
    switch (el) {
        case 'add_new':
            user_add.style.display = 'flex'
            break;
        case 'check':
            search_user.style.display = 'flex'
            break;
        case 'finde':
            search_user.style.display = 'none'
            searched_user.style.display ='flex' 
            break;
        case 'licens':
            searched_user.style.display = 'none'
            licens_add.style.display = 'flex'
            break;
        
        default:
            break;
    }
}

const back = function (el) {
    el.style.display = 'none';
    menu.style.display = 'flex'
}



const write_data = function (name, nickname, date, desc,) {
    
    let nick = nickname.toLowerCase()
    users[nick] = {
        name: name,
        date: date,
        desc: desc,
        licens: {
            period: null,
            date: null
        },
        weapons: {
            lvl:null,
            date:null
        },
    }
    sendData()
}
var serched_user 

const add_license = function (period,lvl, day){
    const options = { timeZone: 'Europe/Kiev' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const currentDate = new Date();   
    
    if (!(period==='none')) {
        users[serched_user].licens.period = period
        const targetDate =  new Date(currentDate.getTime() + (Number(period) * 24 * 60 * 60 * 1000));
        users[serched_user].licens.date = formatter.format(targetDate);
    }
    if (!(lvl==='none')) {
        users[serched_user].weapons.lvl = lvl
        if (day === undefined) {
            const targetDate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));
            users[serched_user].weapons.date = formatter.format(targetDate);
        }else{
            const targetDate = new Date(currentDate.getTime() + (Number(day) * 24 * 60 * 60 * 1000));
            users[serched_user].weapons.date = formatter.format(targetDate);

        }
    }
    sendData()
}
const check_license = function () {
    const license = document.getElementById('user_license');
    const weapons = document.getElementById('user_weapons');

    const options = { timeZone: 'Europe/Kiev' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const currentDate = new Date(formatter.format(new Date()));

    const end_date_license = new Date(users[serched_user].licens.date)
    const end_date_weapons = new Date(users[serched_user].weapons.date)
    if (currentDate > end_date_license ) {
        document.getElementById('user_license').style.color = "red"
    }
    if (currentDate > end_date_weapons) {
        document.getElementById('user_weapons').style.color = 'red'
    }
    
}

const user_search = function(current_user){
    
    const user = current_user.toLowerCase()
    serched_user = user
    if(!(user in users)){
        document.getElementById('error_search').style.display = 'block'
        return
    }
    
    menu_select('finde')

    document.getElementById('user_license').style.color = 'white'
    document.getElementById('user_weapons').style.color = 'white'

    const name = document.createElement('p').innerHTML = `- ${users[user].name}`
    document.getElementById('user_name').innerHTML = name

    const nick = document.createElement("p").innerHTML = `- ${current_user}`
    document.getElementById('user_nick').innerHTML = nick

    const date = document.createElement("p").innerHTML = `- ${users[user].date}`
    document.getElementById('user_date').innerHTML = date

    const desc = document.createElement("p").innerHTML = `- ${users[user].desc}`
    document.getElementById('user_desc').innerHTML = desc
    
    const licens_user = document.createElement("p").innerHTML = `- ${users[user].licens.period ? users[user].licens.period : 'Відсутня'}`;
    document.getElementById('user_license').innerHTML = licens_user
    if (licens_user === '- Відсутня') {
        document.getElementById('user_license').style.color = 'red'
    }
    const weapons = document.createElement("p").innerHTML = `- ${users[user].weapons.lvl ? users[user].weapons.lvl:'Відсутня'}`
    document.getElementById('user_weapons').innerHTML = weapons
    if (weapons === '- Відсутня') {
        document.getElementById('user_weapons').style.color = 'red'
    }
    check_license()
}


function showPopup(text) {
    // Создаем элемент для попапа
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = text;

    // Стилизуем попап
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    popup.style.color = 'white';
    popup.style.fontSize = '19'
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '9999';

    // Добавляем попап на страницу
    document.body.appendChild(popup);

    // Через 3 секунды вызываем функцию send и удаляем попап
    setTimeout(() => {
        
        document.body.removeChild(popup);
    }, 3000);
}