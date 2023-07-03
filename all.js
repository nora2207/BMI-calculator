
var btnArea = document.querySelector('.btnArea');
var btn = document.querySelector('.result-btn');
var ChangeBtn = document.querySelector('.result');
var stateBtn = document.querySelector('.status');
var list = document.querySelector('.list');
var cleanData = document.querySelector('.cleanHistory');
var data = JSON.parse(localStorage.getItem('bmiData')) || [];
var refresh = document.querySelector('.refresh');
var BMIcolor = {
    '重度肥胖':{
        class:'barColor-red'
    },
    '中度肥胖':{
        class:'barColor-darkOrange'
    },
    '輕度肥胖':{
        class:'barColor-darkOrange'
    },
    '過重':{
        class:'barColor-orange'
    },
    '理想':{
        class:'barColor-green'
    },
    '過輕':{
        class:'barColor-blue'
    }
};


// 更新
update(data);

// 監聽
btn.addEventListener('click',BMI,false);
cleanData.addEventListener('click',clean,false);
refresh.addEventListener('click',restart,false);

// 計算BMI
function BMI(){
    var cm = document.querySelector('.textHeight').value;
    var kg = document.querySelector('.textWeight').value;
    var m = cm/100;
    var BMI = (kg/(m*m)).toFixed(2);

// 輸入資料判斷
    var textHeight = document.querySelector('.textHeight');
    var textWeight = document.querySelector('.textWeight');
    if(textHeight.value == ""){
        alert('請輸入身高');
        return;
    }else if(textHeight.value > 300){
        alert('請輸入正確的數值');
        return;
    }else if(textWeight.value == ""){
        alert('請輸入體重');
        return;
    }else if(textWeight.value > 600){
        alert('請輸入正確的數值');
        return;
    }else{
        ChangeBtn.classList.add('hidebtn');
        stateBtn.classList.remove('hidebtn');
    }

// 計算日期時間
    var date = new Date();
    var YY = date.getFullYear();
    var MM = (date.getMonth()+1).toString().padStart(2,'0');
    var DD = date.getDate().toString().padStart(2,'0');
    var time = YY+'-'+MM+'-'+DD;

// 設定BMI指標
    var bminb = document.querySelector('.bmi-nb');
    var statustext = document.querySelector('.status-text');
    if (BMI>=35){
        level = '重度肥胖';
        bminb.textContent = BMI;
        btnArea.classList.add('red');
        statustext.textContent = '重度肥胖';
        stateBtn.classList.add('status-red');
        refresh.classList.add('result-red');
    } else if (BMI<35 && BMI>=30){
        level = '中度肥胖';
        bminb.textContent = BMI;
        btnArea.classList.add('darkOrange');
        statustext.textContent = '中度肥胖';
        stateBtn.classList.add('status-darkOrange');
        refresh.classList.add('result-darkOrange');
    } else if (BMI<30 && BMI>=27){
        level = '輕度肥胖';
        bminb.textContent = BMI;
        btnArea.classList.add('darkOrange');
        statustext.textContent = '輕度肥胖';
        stateBtn.classList.add('status-darkOrange');
        refresh.classList.add('result-darkOrange');
    } else if (BMI<27 && BMI>=24){
        level = '過重';
        bminb.textContent = BMI;
        btnArea.classList.add('orange');
        statustext.textContent = '過重';
        stateBtn.classList.add('status-orange');
        refresh.classList.add('result-orange');
    } else if (BMI<24 && BMI>=18.5){
        level = '理想';
        bminb.textContent = BMI;
        btnArea.classList.add('green');
        statustext.textContent = '理想';
        stateBtn.classList.add('status-green');
        refresh.classList.add('result-green');
    } else {
        level = '過輕';
        bminb.textContent = BMI;
        btnArea.classList.add('blue');
        statustext.textContent = '過輕';
        stateBtn.classList.add('status-blue');
        refresh.classList.add('result-blue');
    }

// 組合
    var all = {
	    level: level,
        BMI: BMI,
	    weight: kg,
        height: cm,
        time: time,
    };

// 將資料物件 存入array
    data.push(all);

// 將資料更新  
    update(data);

// 存到 localstage
    localStorage.setItem('bmiData', JSON.stringify(data));
}

// 更新內容
function update(item){
    var str ='';
    var len = item.length;
    for(var i=0;i<len;i++){
        if(item[i].BMI >=35){
            set = '重度肥胖';
        }else if (item[i].BMI<35 && item[i].BMI>=30){
            set = '中度肥胖';
        }else if (item[i].BMI<30 && item[i].BMI>=27){
            set = '輕度肥胖';
        }else if (item[i].BMI<27 && item[i].BMI>=24){
            set = '過重';
        }else if (item[i].BMI<24 && item[i].BMI>=18.5){
            set = '理想';
        }else{
            set = '過輕';
        };
        str += '<li class="bar '+ BMIcolor[set].class +'"><span class="listLevel">'+ item[i].level +'</span>'+'<span class="BMI1">'+'BMI'+'</span>'+'<div class="BMI">'+ item[i].BMI +'</div>'+'<span class="weight1">'+'weight'+'</span>'+'<div class="weight">'+ item[i].weight +'kg' +'</div>'+'<span class="height1">'+'height'+'</span>'+'<div class="height">'+ item[i].height +'cm' +'</div><div class="time">'+ item[i].time +'</div></li>'
    }
    list.innerHTML = str;
}

// refresh 按鈕
function restart(){
    window.location.reload();
}

// 刪除內容
function clean(e){
    e.preventDefault();
    data = [];
    localStorage.setItem('bmiData', JSON.stringify(data));
    update(data);
}