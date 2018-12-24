<template>
  <div>
    <header class="mt-3">
      <b-container class="pl-lg-5 pl-3">
        <div class="h1 p-2">
          <i class="far fa-clock"/> 時間割メーカー
        </div>
      </b-container>
    </header>
    <b-container class="mt-4 pr-0 pr-lg-5 pl-0 pl-lg-5">
      <div class="card ml-1 pl-1">
        <b-row class="no-gutters">
          <b-col lg="7">
            <b-row>
              <b-col cols="12">
                <pie-chart 
                  :chart-data="datacollection" 
                  :options="chartOptions"/>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6"/>
              <b-col 
                cols="5" 
                class="pr-lg-5">
                <b-button 
                  id="download" 
                  class="btn-block" 
                  @click="onDownload()">
                  <i class="fas fa-download"/>
                  <span class="pl-2">Download</span>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col 
            lg="5" 
            class>
            <b-row class="mt-5 no-gutters">
              <b-col cols="1"/>
              <b-col 
                cols="2" 
                class="text-center">
                <label>From</label>
              </b-col>
              <b-col 
                cols="3" 
                class="pl-2 pr-2">
                <label>To</label>
              </b-col>
              <b-col cols="6">
                <label>スケジュール</label>
              </b-col>
            </b-row>
            <b-row
              v-for="(schedule,index) in schedules"
              :key="schedule.id"
              class="no-gutters"
            >
              <b-col cols="1">
                <b-button
                  :style="{ backgroundColor: baseColors[schedule.colorNo] }"
                  id="colorBox"
                  @click="onChangeColor(index)"
                />
              </b-col>
              <b-col 
                cols="2" 
                class>
                <p class="text-center pt-2 pl-2">{{ schedule.fromTime }} 〜</p>
              </b-col>
              <b-col 
                cols="3" 
                class="pl-2 pr-2">
                <b-form-select
                  v-model="schedule.toTime"
                  :options="timeOptions()"
                  class="mb-3"
                  @input="selectToTime()"
                />
              </b-col>
              <b-col 
                cols="6" 
                class="pl-2 pr-2">
                <input 
                  class="form-control" 
                  v-model="schedule.plan">
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6"/>
              <b-col cols="3">
                <b-button 
                  class="btn-block delete-btn" 
                  @click="onDeleteSchedule()">削除</b-button>
              </b-col>
              <b-col 
                cols="3" 
                class="pl-0 pr-4">
                <b-button 
                  class="btn-block" 
                  variant="primary" 
                  @click="onAddSchedule()">追加</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="my-3 pr-2">
          <b-col 
            lg="8" 
            cols="12"/>
          <b-col 
            lg="2" 
            cols="6">
            <b-button 
              variant="primary" 
              class="btn-block" 
              @click="onSetSample()">サンプル</b-button>
          </b-col>
          <b-col 
            lg="2" 
            cols="6">
            <b-button 
              variant="primary" 
              class="btn-block" 
              @click="fillData()">セット</b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <footer class="text-center mt-5 mt-lg-4 px-5">
      <div class="px-3">
        <a
          data-size="large"
          href="https://twitter.com/share?text=時間割メーカー。簡単に1日のスケジュールを立てられるサービスです。朝に使うとより幸せになれます。&hashtags=時間割メーカー&url=https://mitsudaman.github.io/TSMaker/"
          title="Twitter"
          class="twitter-share-button"
          data-show-count="false"
        >Tweet</a>
        <script 
          async 
          src="https://platform.twitter.com/widgets.js" 
          charset="utf-8"/>
        <a
          href="http://b.hatena.ne.jp/entry/s/mitsudaman.github.io/vue-trial/TimeSchedule/"
          class="hatena-bookmark-button"
          data-hatena-bookmark-layout="basic-label"
          data-hatena-bookmark-lang="ja"
          data-hatena-bookmark-height="28"
          title="このエントリーをはてなブックマークに追加"
        >
          <img
            src="https://b.st-hatena.com/images/entry-button/button-only@2x.png"
            alt="このエントリーをはてなブックマークに追加"
            width="20"
            height="20"
            style="border: none;"
          >
        </a>
        <script
          type="text/javascript"
          src="https://b.st-hatena.com/js/bookmark_button.js"
          charset="utf-8"
          async="async"
        />
      </div>
      <div>
        開発・運営
        <img 
          src="~/assets/img/mitsudama.png" 
          width="30"
          height="30"
          class="pb-1 border-4"
          alt="mitsudama">
        <a 
          href="https://twitter.com/mitudama" 
          target="_blank">@mitudama</a> Copyright ©2018 All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
import PieChart from "./PieChart.js";
import "chartjs-plugin-labels";

export default {
  components: {
    PieChart
  },
  data() {
    return {
      activeColor: "black",
      datacollection: null,
      chartOptions: {
        // title: {
        //   display: true,
        //   fontSize: 35,
        //   text: "タイムスケジュール"
        // },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 0,
            bottom: 0
          }
        },
        plugins: {
          labels: [
            {
              render: function(args) {
                var time;
                if (args.index == 0) {
                  time = "0 ~ " + args.value;
                } else {
                  var from = 0;
                  var to = 0;
                  for (var i = 0; i < args.index; i++) {
                    if (i != args.dataset.data.length - 1) {
                      from += args.dataset.data[i];
                      to = from + args.value;
                    }
                  }
                  time = from + "~" + to;
                }
                return time;
              },
              fontSize: 14,
              fontStyle: "bold",
              fontColor: "#000",
              position: "outside"
              // arc: true,
            },
            {
              render: function(data) {
                if (data.dataset.param[data.index]) {
                  return data.dataset.param[data.index].plan;
                } else {
                  return "その他";
                }
              },
              fontSize: 14,
              fontStyle: "bold",
              fontColor: "#000"
            }
          ]
        }
      },
      datas: [],
      //Amerivan PaletteAmerivan Palette
      baseColors: [
        "#ff7675",
        "#fd79a8",
        "#fdcb6e",
        "#ffeaa7",
        "#00b894",
        "#55efc4",
        "#0984e3",
        "#74b9ff",
        "#a29bfe",
        "#b2bec3"
      ],
      graphColors: [],
      labels: [],
      schedules: [
        {
          colorNo: 0,
          fromTime: 0,
          toTime: 1,
          plan: ""
        }
      ],
      timeOptions: () => {
        var times = [];
        for (var i = 0; i <= 24; i += 0.5) {
          times.push({ value: i, text: i });
        }
        return times;
      },
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      Chart.plugins.register({
        beforeDraw: function(chartInstance) {
          var ctx = chartInstance.chart.ctx;
          ctx.fillStyle = "white";
          ctx.fillRect(
            0,
            0,
            chartInstance.chart.width,
            chartInstance.chart.height
          );
        }
      });
      this.setChartParam();
      this.datacollection = {
        datasets: [
          {
            data: this.datas,
            backgroundColor: this.graphColors,
            param: this.schedules
          }
        ]
        // labels: this.labels
      };
      window.scrollTo(0, 0);
    },
    setChartParam() {
      this.datas = [];
      this.graphColors = [];
      this.labels = [];

      //スケジュール分 時刻・カラー・ラベルを設定する
      for (var i = 0; i < this.schedules.length; i++) {
        this.datas.push(this.schedules[i].toTime - this.schedules[i].fromTime);
        var addColor = this.baseColors[this.schedules[i].colorNo];
        this.graphColors.push(addColor);
        var addLabel = this.schedules[i].plan;
      }

      //最後のtoTimeが24以下の場合埋め合わせ用の時間を入れる
      if (this.schedules.slice(-1)[0].toTime < 24) {
        this.datas.push(24 - this.schedules.slice(-1)[0].toTime);
        var addColor = this.baseColors[
          (this.schedules.length + 1) % this.baseColors.length
        ];
        this.graphColors.push(addColor);
      }
    },
    selectToTime() {
      this.toTimeEqualizeNextFromTime();
    },
    toTimeEqualizeNextFromTime() {
      for (var i = 0; i < this.schedules.length; i++) {
        if (i != this.schedules.length - 1) {
          this.schedules[i + 1].fromTime = this.schedules[i].toTime;
        }
      }
    },
    onAddSchedule() {
      var fromTime = this.schedules.slice(-1)[0].toTime;
      this.schedules.push({
        colorNo: this.schedules.length,
        fromTime: fromTime,
        toTime: fromTime + 1,
        plan: ""
      });
    },
    onDeleteSchedule() {
      if (this.schedules.length > 1) {
        this.schedules.splice(this.schedules.length - 1, 1);
      }
    },
    onSetSample() {
      this.schedules = [
        {
          colorNo: 0,
          fromTime: 0,
          toTime: 7,
          plan: "寝る"
        },
        {
          colorNo: 1,
          fromTime: 7,
          toTime: 8,
          plan: "準備＆通勤"
        },
        {
          colorNo: 2,
          fromTime: 8,
          toTime: 12,
          plan: "仕事"
        },
        {
          colorNo: 3,
          fromTime: 12,
          toTime: 13,
          plan: "お昼"
        },
        {
          colorNo: 4,
          fromTime: 13,
          toTime: 17,
          plan: "仕事"
        },
        {
          colorNo: 5,
          fromTime: 17,
          toTime: 18,
          plan: "退勤"
        },
        {
          colorNo: 6,
          fromTime: 18,
          toTime: 20,
          plan: "夜ご飯＆風呂"
        },
        {
          colorNo: 7,
          fromTime: 20,
          toTime: 24,
          plan: "自由"
        }
      ];
      this.schedules.push();
    },
    onDownload() {
      let canvas = document.getElementById("pie-chart");
      let link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "time_schedule.png";
      link.click();
    },
    onChangeColor(index) {
      this.schedules[index].colorNo =
        (this.schedules[index].colorNo + 1) % this.baseColors.length;
    }
  }
};
</script>

<style>
#colorBox {
  margin-top: 7px;
  width: 20px;
  height: 25px;
}
.delete-btn {
  background-color: white;
  color: red;
  border: solid 1px red;
}
.delete-btn:hover {
  background-color: #f86c6b;
  color: white;
  border: solid 1px red;
}
header {
  background-color: silver;
  color: white;
}
</style>