<template>
    <div class="screening">
        <div class="all">
            主题分类：
            <div v-for="(item,index) in subject" :key="index">
                <span
                    class="subjectItem"
                    @click="subjectClick(item.tag)"
                    :class="{bold:currentTag==item.tag}"
                >{{item.name}}</span>
            </div>
        </div>

        <div class="all-xijie">
            主题细节：
            <div v-for="(item,index) in detail" :key="index">
                <span
                    class="subjectItem"
                    v-show="currentTag==item.tag || currentTag=='all'"
                    :class="{bold:currentName==item.name}"
                    @click="detailClick(item.name)"
                >{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "screening",
    data() {
        return {
            subject: [
                {
                    name: "全部",
                    tag: "all"
                },
                {
                    name: "HTML语言",
                    tag: "html"
                },
                {
                    name: "CSS技术",
                    tag: "css"
                },
                {
                    name: "Javascript",
                    tag: "js"
                },
                {
                    name: "前端框架",
                    tag: "front"
                },
                {
                    name: "后台框架",
                    tag: "back"
                },
                {
                    name: "数据库",
                    tag: "database"
                }
            ],
            detail: [
                {
                    name: "HTML",
                    tag: "html"
                },
                {
                    name: "HTML5",
                    tag: "html"
                },
                {
                    name: "CSS",
                    tag: "css"
                },
                {
                    name: "CSS3",
                    tag: "css"
                },
                {
                    name: "Js语法基础",
                    tag: "js"
                },
                {
                    name: "DOM文档对象模型",
                    tag: "js"
                },
                {
                    name: "面向对象的程序设计",
                    tag: "js"
                },
                {
                    name: "Vue.js",
                    tag: "front"
                },
                {
                    name: "Bootstrap",
                    tag: "front"
                },
                {
                    name: "Node.js",
                    tag: "front"
                },
                {
                    name: "Express",
                    tag: "front"
                },
                {
                    name: "PHP",
                    tag: "back"
                },
                {
                    name: "JSP",
                    tag: "back"
                },
                {
                    name: "Java",
                    tag: "back"
                },
                {
                    name: "MySQL",
                    tag: "database"
                },
                {
                    name: "mongDB",
                    tag: "database"
                }
            ],
            currentTag: "all",
            currentName: ""
        };
    },
    methods: {
        subjectClick(tag) {
            this.currentTag = tag;
        },
        detailClick(name) {
            this.currentName = name;
        }
    }
};
</script>

<style lang='scss' scoped>
.all {
    margin-bottom: 15px;
}
.all > div,
.all-xijie > div {
    display: inline-block;
}
.subjectItem {
    margin-right: 20px;
}
.bold {
    font-weight: bold;
}
</style>