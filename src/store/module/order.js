// 设置属性，主要承载一些属性，存储数据的
const state = {
    menuItems: [], // 菜单信息
    basketItems: [] // 购物车数据
}

// 对应的一些方法,用来获取到属性(state)的状态
const getters = {
    // 菜单信息
    getMenuItems: state => state.menuItems,
    getBasketItems: state => state.basketItems
}

// 主要用来更改属性(state)的状态，完全是同步的操作
const mutations = {
    // state：就是上面的state
    // data：页面传过来的数据
    setMenuItems(state, data) {
        state.menuItems = data;
    },

    // 将新添加的pizza Push到menuItems属性中
    pushToMenuItems(state, data) {
        state.menuItems.push(data);
    },

    // 将匹配到对象,在menuItems数组中删除
    removeMenuItems(state, data) {
        state.menuItems.forEach((item, index) => {
            if (item == data) {
                state.menuItems.splice(index, 1)
            }
        });
    },

    // 添加到购物车
    addBasket(state, data) {
        state.basketItems.push(data);
    }
}

// 不直接操作，应用mutations，可以实现异步的操作
const actions = {

}

// 暴露对象，让其他页面可以拿到
export default {
    state,
    getters,
    mutations,
    actions
}