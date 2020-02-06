import request from "@/utils/request"

export default {
    // 获取商品信息
    getList() {
        return request({
            url: '/order',
            method: 'get'
        })
    },

    // 新增商品
    add(pojo) {
        return request({
            url: '/order',
            method: 'post',
            data: pojo
        })
    },

    // 删除商品
    deleteById(id) {
        return request({
            url: `/order/${id}`,
            method: 'delete'
        })
    },

    // 添加到购物车
    addBasket(pojo){
        return request({
            url: '/orderBasket',
            method: 'post',
            data: pojo
        })
    }
}