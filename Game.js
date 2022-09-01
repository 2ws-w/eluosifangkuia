
Game = function () {
    // 设置行和列
    this.row = 20;
    this.col = 12;
    // 初始化
    this.init();
    //实例方块，使游戏开始就有一个方块
    this.block = new Block();
    // 实例下一个方块
    this.nextBlock = new Block();
    //实例地图
    this.map = new Map(this);
    // 启动定时器
    this.start();
    // 事件监听实现左右移动
    this.bindEvent();
    // 分数
    this.score = 0;
    // 速度
    this.during = 30;
}

Game.prototype.init = function () {
    var body = document.querySelector('body');
    var table = document.createElement('table');
    $(table).addClass('tab1');
    // 渲染表格
    for (let i = 0; i < this.row; i++) {
        // 创建tr
        var tr = document.createElement('tr');

        for (let j = 0; j < this.col; j++) {
            // 创建td
            var td = document.createElement('td');
            tr.appendChild(td);
        }
        table.appendChild(tr);

    }

    //初始化预览窗口
    var table2 = document.createElement('table');
    $(table2).addClass('tab2');

    for (var i = 0; i < 4; i++) {
        // 创建tr
        var tr2 = document.createElement('tr');

        for (var j = 0; j < 4; j++) {
            // 创建td
            var td2 = document.createElement('td');
            tr2.appendChild(td2);
        }
        table2.appendChild(tr2);
    }
    body.appendChild(table);
    body.appendChild(table2);


}
Game.prototype.setColor = function (row, col, num) {
    // 给对应的方块添加对应的颜色类名
    // var tr = document.querySelector('tr');
    // var td = document.querySelector('td');
    $('.tab1').find('tr').eq(row).children('td').eq(col).addClass('c' + num);
    // 转换成js的写法失败，只能引入jq
}

Game.prototype.setNextColor = function (row, col, num) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.nextBlock.code[i][j] != 0) {
                $('.tab2').find('tr').eq(i).children('td').eq(j).addClass('c' + this.nextBlock.code[i][j]);
            }
        }
    }
}
// 每次渲染之前先清除画布
Game.prototype.clear = function () {
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            $('.tab1').find('tr').eq(i).children('td').eq(j).removeClass();
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('.tab2').find('tr').eq(i).children('td').eq(j).removeClass();
        }
    }
}
// 移动
Game.prototype.bindEvent = function () {
    // 备份
    var self = this;
    document.onkeydown = function (e) {
        // 使用最新方法来代替keycode
        if (e.key == 'ArrowLeft') {
            //先判断是否能往左走，否则会出现穿墙的情况
            self.block.checkLeft();
        } else if (e.key == 'ArrowRight') {
            // 判断向右
            self.block.checkRight();
        } else if (e.key == "ArrowDown") {
            //按 空格 实现一键到底功能
            self.block.checkBlockEnd();
        } else if (e.key == "ArrowUp") {
            //按 上 实现方块的旋转
            self.block.checkRotate();
        }
    }
}

Game.prototype.start = function () {
    var self = this;
    // 设置帧编号f以计算分数
    this.f = 0;
    this.timer = setInterval(function () {
        self.f++;
        // 渲染帧编号
        document.getElementById('f').innerHTML = "帧编号：" + self.f;
        //清屏
        self.clear();
        // 渲染方块
        self.block.render();
        // 渲染预览方块;
        self.setNextColor();
        // 渲染地图
        self.map.render(self);

        self.f % self.during == 0 && self.block.checkDown();
    }, 20)
}
    // 目前的表格只是一个dom ，并没有数据，引入地图类给大table添加数据
