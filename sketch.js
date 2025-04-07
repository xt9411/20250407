let circles = [];

function setup() {
  // 產生一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);
  // 設定畫布的背景顏色為 "#4f772d"
  background("#4f772d");

  // 產生 40 個圓
  for (let i = 0; i < 40; i++) {
    let circle = {
      x: random(width),
      y: random(height),
      size: random(30, 50),
      color: color(random(255), random(255), random(255))
    };
    circles.push(circle);
  }

  // 建立選單
  createMenu();
}

function draw() {
  // 清除畫布並重設背景
  background("#4f772d");

  // 根據滑鼠的 X 位置調整圓的大小
  let sizeOffset = map(mouseX, 0, width, 20, 80);

  // 繪製所有圓
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset);
  }
}

function createMenu() {
  // 建立選單的容器
  let menu = createDiv();
  menu.id('menu');
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('right', '-300px'); // 初始位置在螢幕外（隱藏）
  menu.style('padding', '10px');
  menu.style('background', '#ffffff');
  menu.style('border-radius', '10px');
  menu.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
  menu.style('transition', 'right 0.5s'); // 加入滑動動畫效果

  // 選單項目
  let items = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  let ul = createElement('ul');
  ul.style('list-style', 'none');
  ul.style('margin', '0');
  ul.style('padding', '0');

  for (let item of items) {
    let li = createElement('li', item);
    li.style('padding', '8px 16px');
    li.style('margin', '25px 0'); // 每個項目上下間距為 50px（上下各 25px）
    li.style('background', '#4f772d');
    li.style('color', '#ffffff');
    li.style('border-radius', '5px');
    li.style('cursor', 'pointer');
    li.style('transition', 'background 0.3s');
    li.style('font-size', '30px'); // 設定文字大小為 30px

    // 滑鼠移動到選單項目時改變顏色
    li.mouseOver(() => li.style('background', '#d4a373'));
    li.mouseOut(() => li.style('background', '#4f772d'));

    // 如果是 "作品集"，加入子選項
    if (item === '作品集') {
      let subUl = createElement('ul');
      subUl.style('list-style', 'none');
      subUl.style('margin', '0');
      subUl.style('padding', '0');
      subUl.style('display', 'none'); // 預設隱藏子選項

      let subItems = [
        { name: '第一周作業', link: 'https://xt9411.github.io/20250303/' },
        { name: '第二周作業', link: 'https://xt9411.github.io/20250310/' },
        { name: '第三周作業', link: 'https://xt9411.github.io/20250317/' },
        { name: '第四周作業', link: 'https://xt9411.github.io/20250324/' }
      ];

      for (let subItem of subItems) {
        let subLi = createElement('li', subItem.name);
        subLi.style('padding', '8px 16px');
        subLi.style('margin', '10px 0');
        subLi.style('background', '#d4a373');
        subLi.style('color', '#ffffff');
        subLi.style('border-radius', '5px');
        subLi.style('cursor', 'pointer');
        subLi.style('font-size', '20px'); // 子選項文字大小

        // 點擊子選項時，顯示 iframe
        subLi.mousePressed(() => {
          let iframe = select('#contentIframe');
          if (!iframe) {
            iframe = createElement('iframe');
            iframe.id('contentIframe');
            iframe.style('position', 'absolute');
            iframe.style('top', '20%');
            iframe.style('left', '20%');
            iframe.style('width', '60%');
            iframe.style('height', '60%');
            iframe.style('border', '2px solid #4f772d');
            iframe.style('border-radius', '10px');
            iframe.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
            iframe.style('z-index', '1000');
            document.body.appendChild(iframe.elt);
          }
          iframe.attribute('src', subItem.link);
        });

        subUl.child(subLi);
      }

      li.mousePressed(() => {
        // 切換子選項顯示/隱藏
        subUl.style('display', subUl.style('display') === 'none' ? 'block' : 'none');
      });

      li.child(subUl);
    }

    ul.child(li);
  }

  menu.child(ul);

  // 點擊空白處時關閉 iframe
  document.body.addEventListener('click', (event) => {
    let iframe = select('#contentIframe');
    if (iframe && !menu.elt.contains(event.target)) {
      iframe.remove();
    }
  });

  // 當滑鼠移動到螢幕右側時，顯示選單
  document.body.addEventListener('mousemove', (event) => {
    if (event.clientX > window.innerWidth - 50) {
      menu.style('right', '10px'); // 滑出到原本位置
    } else if (event.clientX < 50) {
      menu.style('right', '-300px'); // 隱藏到螢幕外
    }
  });
}
