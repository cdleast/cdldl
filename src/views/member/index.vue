<template>
    <div class="member">
        member
        {{list}}
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
    name: "member",
    data() {
        return {
            list: {}
        };
    },
    created() {
        let param = { pageNo: 1, pageSize: 50 };
        let lassUrl = "service/list";
        request({
            // url: lassUrl,
            method: "post",
            params: {
                param,
                lassUrl
            }
        }).then(res => {
            this.list = JSON.parse(res.data.result);
        });
    }
};
</script>

<style lang='scss' scoped>
</style>