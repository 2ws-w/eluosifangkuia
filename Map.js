Map = function () {
    //地图矩阵
    this.mapCode = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]


    ]

}
//引用map之前的表格只是一个dom ，并没有数据，引入地图类给大table添加数据
Map.prototype.render = function (mapGame) {
    // 渲染地图
    for (var i = 0; i < mapGame.row; i++) {
        for (var j = 0; j < mapGame.col; j++) {
            if (this.mapCode[i][j] != 0) {
                game.setColor(i, j, this.mapCode[i][j])
            }
            // $('tr').eq(i).children('td').eq(j).html(this.mapCode[i][j]);
            // 将数字显示到地图上
        }

    }
    Map.prototype.checkRemove = function () {
        // 判断当前mapCode是否消行
        // 规则：mapCode数组的每一项如果都不为0，则消行
        for (var i = 0; i < 20; i++) {
            // 遍历数组
            if (this.mapCode[i].indexOf(0) == -1) {
                // indexOf(0)检测是否出现0，没有时返回-1
                this.mapCode.splice(i, 1);
                // 删除一行补一行，保持位置不变
                this.mapCode.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])


                // 根据不同速度获得不同加分
                if (game.during <= 30 && game.during >= 20) {
                    game.score += 10;
                } else if (game.during < 20 && game.during >= 10) {
                    game.score += 20;

                } else {
                    game.score += 30;

                }
                document.getElementById('score').innerHTML = "分数：" + game.score;
                if (game.score % 100 == 0) {
                    game.during -= 5;
                    if (game.during <= 0) {
                        game.during = 2;
                    }
                    // 每获得100分游戏速度增加

                }

            }
        }
    }
};