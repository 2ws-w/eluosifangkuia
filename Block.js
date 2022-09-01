Block = function () {
    // 将所有类型和形状都随机
    // 1.得到所有的类型
    var allType = ["S", "T", "O", "J", "L", "Z", "I"];
    // 2.从所有类型里面随机得到一个
    this.type = allType[parseInt(Math.random() * allType.length)];
    // 3.获取当前方块类型后，得到其总形态数量
    this.allDir = fangkuai[this.type].length;
    // 4.通过allDir的length得到数量，在这个范围里获取一个随机数（即随机形态）
    this.dir = parseInt(Math.random() * this.allDir);
    // 5.得到随机方块
    this.code = fangkuai[this.type][this.dir];

    // 初始行
    this.row = 0;
    // 初始列，因为要居中所以列为4
    this.col = 4;
}
Block.prototype.render = function () {
    // 渲染四行四列的方块
    for (i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // 如果4x4的矩阵中某一项不是0，就说明有颜色
            if (this.code[i][j] != 0) {
                game.setColor(i + this.row, j + this.col, this.code[i][j])
            }
        }
    }
}

// 在每一次方块下落时，都需要将 方块的下一次运动位置与地图判断 是否有方块存在，若有则停止下落

// 预判断
Block.prototype.check = function (row, col) {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (this.code[i][j] != 0 && game.map.mapCode[i + row][j + col] !== 0) {
                return false;

            }
        }
    }
    return true;
};


// 判断方块是否能够下落
Block.prototype.checkDown = function () {
    // 判断地图和方块是否有重合，this.row指的是与判断
    if (this.check(this.row + 1, this.col)) {
        this.row++;
    } else {
        // 重新渲染新的方块
        game.block = game.nextBlock;
        // 让方块等于预览框里面的方块
        game.nextBlock = new Block();
        // 方块下落到底时，渲染到地图上
        this.renderMap();
        // 消行操作！
        // 在每一次方块下落到底时，进行判断地图上是否存在某行中所有列都不为0的情况，若果有则将其全部变为0
        // 判断是否可以消行
        game.map.checkRemove();
        // 判断游戏是否结束
        this.checkOver();
    }
};

// 将到底的方块渲染到地图上
Block.prototype.renderMap = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // 将已有的方块渲染到Map的mapCode上 
            if (this.code[i][j] !== 0) {
                game.map.mapCode[this.row + i][this.col + j] = this.code[i][j];
            }
        }
    }
}


// 判断是否能够向左移动
Block.prototype.checkLeft = function () {
    if (this.check(this.row, this.col - 1)) {
        this.col--;
    }
}
// 判断能否向右
Block.prototype.checkRight = function () {
    if (this.check(this.row, this.col + 1)) {
        this.col++;
    }
}
Block.prototype.checkBlockEnd = function () {
    // 使用while循环，如果check为ture，则让row++，否则则不动。
    while (this.check(this.row + 1, this.col)) {
        this.row++;
    }
}

//方块旋转
Block.prototype.checkRotate = function () {
    // dir是形状数组
    // 先备份旧方块
    var oldDir = this.dir;
    // 改变新方块 
    this.dir++;
    // 判断dir值是否超过最大数组长度，超过则回到第1种状态
    if (this.dir > this.allDir - 1) {
        this.dir = 0;
    }
    // 在改变形状之后，渲染新的方块
    this.code = fangkuai[this.type][this.dir];
    //！存在问题，在切换旋转 的过程中，旋转会卡在已有的方块之中
    // ！解决方法，备份一份就数据，应该使旋转前进行判读左右是否有方块，若果有则打回旧数据
    if (!this.check(this.row, this.col)) {
        // 进入该循环说明新方块与地图有重合，打回旧方块，并重新渲染
        this.dir = oldDir;
        this.code = fangkuai[this.type][this.dir];
    }

}

// 判断游戏结束
Block.prototype.checkOver = function () {
    // 如果最顶行由内容，则游戏结束
    for (var i = 0; i < game.col; i++) {
        if (game.map.mapCode[0][i] != 0) {
            clearInterval(game.timer);
            alert('游戏结束！得分为：' + game.score);
        }

    }
}