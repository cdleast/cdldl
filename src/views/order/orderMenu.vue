<template>
    <div class="orderMenu">
        <!-- 
             :gutter="20" 是两个table的间距
        -->
        <el-row :gutter="20">
            <!-- 菜单 -->
            <el-col :span="16">
                <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="size" label="尺寸"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column label="加入">
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.name !== ''"
                                @click="addToBasket(scope.$index, scope.row)"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

            <!-- 购物车 -->
            <el-col :span="8">
                <el-table :data="baskets" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="num" label="数量">
                        <template slot-scope="scope">
                            <el-button @click="decreaseQuantity(scope.row)" type="text">-</el-button>
                            <span class="input-number">{{scope.row.quantity}}</span>
                            <el-button @click="increaseQuantity(scope.row)" type="text">+</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="品种"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                </el-table>
                <template v-if="baskets.length > 0">
                    <el-col class="total-price">总价：{{total + "RMB"}}</el-col>
                    <el-col class="submit-total-price">
                        <el-button size="small" type="primary">提 交</el-button>
                    </el-col>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
const durian = "这是喜欢吃榴莲朋友的最佳选择";
const cheese = "芝士杀手,浓浓的芝士丝, 食欲瞬间爆棚";
const hawaii = "众多人的默认选择";
export default {
    name: "orderMenu",
    data() {
        return {
            // 菜单
            tableData: [
                {
                    type: "榴莲pizza",
                    size: 19,
                    price: 28,
                    description: durian
                },
                {
                    type: "榴莲pizza",
                    size: 29,
                    price: 38,
                    description: durian
                },
                {
                    type: "芝士pizza",
                    size: 39,
                    price: 48,
                    description: cheese
                },
                {
                    type: "芝士pizza",
                    size: 49,
                    price: 58,
                    description: cheese
                },
                {
                    type: "夏威夷pizza",
                    size: 59,
                    price: 68,
                    description: hawaii
                },
                {
                    type: "夏威夷pizza",
                    size: 69,
                    price: 78,
                    description: hawaii
                }
            ],
            baskets: [], // 购物车数据
            num: 1 // 购物车默认数量
        };
    },
    computed: {
        // 购物车总价
        total() {
            let totalCost = 0;
            // 遍历购物车数组
            for (let index in this.baskets) {
                // 拿到每一个对象
                let individualItem = this.baskets[index];
                // 计算总价
                totalCost += individualItem.quantity * individualItem.price;
            }
            return totalCost;
        }
    },
    methods: {
        // 隔行变色
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return "warning-row";
            } else {
                return "success-row";
            }
        },
        // 添加到购物车
        addToBasket(index, row) {
            let basket = {
                type: row.type,
                size: row.size,
                price: row.price,
                quantity: 1 // 自己定义的，没次都会加，后面进行累加
            };

            // 过滤，添加同一商品的时候购物车里面不重复添加，只在数量上进行添加
            // 什么时候添加呢，先判断购物车是否为空
            if (this.baskets.length > 0) {
                // 如果不为空，判断添加的商品是否在购物车中存在
                // 先过滤
                let result = this.baskets.filter(basket => {
                    // 拿到数组里面的每一个对象，进行匹配
                    // 如果添加的basket的type和price===row的type和price，代表购物车里面已经有了这个类型的商品
                    return (
                        basket.type === row.type && basket.price === row.price
                    );
                });

                // result是购物车已经有了的，但是又点击了添加的，我们进行累加
                if (result != null && result.length > 0) {
                    // result长度不等于0，让第0个也急速第一个下面的quantity(上面我们自定义的)进行累加
                    result[0].quantity++;
                } else {
                    // result购物车中没有，直接加进去
                    this.baskets.push(basket);
                }
            } else {
                // 购物车里什么都没有的时候直接添加到购物车
                this.baskets.push(basket);
            }
        },
        // 减号：减少商品
        decreaseQuantity(item) {
            item.quantity--;
            // 购物车中商品数为0时，在购物车中移除该商品
            if (item.quantity <= 0) {
                this.removeFromBasket(item);
            }
        },
        // 加号：增加商品
        increaseQuantity(item) {
            item.quantity++;
        },
        // 商品为0的时候在购物车中移除
        removeFromBasket(item) {
            this.baskets.splice(this.baskets.indexOf(item), 1);
        }
    }
};
</script>

<style lang='scss' scoped>
.orderMenu /deep/ th.is-leaf > .cell {
    font-weight: 700;
    color: #000;
}
.orderMenu /deep/ td.el-table_1_column_1 > .cell {
    color: #409EFF;
    font-size: 20px;
    font-weight: 700;
}
.total-price {
    font-size: 14px;
    margin: 10px 0;
}
.submit-total-price,
.submit-total-price .el-button {
    width: 100%;
}
// 计步器
.input-number {
    padding: 0 10px;
    color: #409EFF;
}
// 隔行变色
// .orderMenu /deep/ .warning-row {
//     background: #409EFF;
// }
// .orderMenu /deep/ .warning-row .cell{
//     color: #fff;
// }
</style>