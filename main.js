/*
1:歌曲搜索接口
请求地址：https://autumnfish.cn/search
请求方法：get
请求参数：keywords(查询关键字)
响应内容：歌曲搜索结果
*/

/*
2.歌曲url获取接口
请求地址：https://autumnfish.cn/song/url
请求方法：get
请求参数：id（查询关键字）
响应内容：歌曲url地址

3.歌曲详情获取
请求地址：https://autumnfish.cn/song/detail
请求方法：get
请求参数：ids（歌曲id）
响应内容：歌曲详情，包含封面信息

4.
请求地址：https://autumnfish.cn/cooment/hot?type=0
请求方法：get
请求参数：id（歌曲id,type固定为0）
响应内容：歌曲的热门评价

5.MV地址获取
请求地址:https://autumnfish.cn/mv/url
请求方法：get
请求参数：id（mvid为0说明没有mv）
响应内容：mv的地址
*/

var app = new Vue({
    el:"#player",
    data:{
        // 查询关键字
        query:"",
        // 歌曲数组
        musicList:[],
        //歌曲地址
        musicUrl:"",
        //歌曲封面
        musicCover:"",
        //歌曲评论
        hotComments:"",
        // 是否正在播放
        isPlaying: false,
        //遮罩层显示状态
        isShow:false,
        //mv地址
        mvUrl:""
    },
    methods: {
        //歌曲搜索
        searchMusic:function(){
            var that = this
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                console.log(response)
                that.musicList = response.data.result.songs
                console.log(response.data.result.songs)
            },function(err){})            
        },
        //歌曲播放
        playMusic: function(musicId) {
            //console.log(musicId)
            var that = this

            //获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                //console.log(response)
                //console.log(response.data.data[0].url)
                that.musicUrl = response.data.data[0].url
            },function (err) { })
            //歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                //console.log(response)
                //console.log(response.data.songs[0].al.picUrl)
                that.musicCover = response.data.songs[0].al.picUrl
            },function(err){})

            //歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                //console.log(response)
                console.log(response.data.hotComments)
                that.hotComments = response.data.hotComments
            },function(err){})
        },
        play:function(){
            console.log("play")
            this.isPlaying = true
            this.mvUrl = ""
        },
        pause:function(){
            console.log("pause")
            this.isPlaying = false
        },
        playMV:function(mvid){
            var that = this
            if(mvid){
                that.isShow = true
                //获取MV信息
                axios.get("https://autumnfish.cn/mv/url?id="+mvid)
                .then(function(response){
                    //console.log(response)
                    //console.log(response.data.data.url)
                    //console.log("........") 
                    that.$refs.audio.pause()
                    that.mvUrl = response.data.data.url
                },function(err){})
            }            
        },
        //隐藏
        hide:function(){
            this.isShow = false
            this.$refs.video.pause()
        }

    }
})