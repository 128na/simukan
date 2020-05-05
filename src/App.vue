<template>
  <div id="app">
    <header-menu />
    <b-container class="mt-4">
      <div class="braw" ref="draw">
        <div :style="bg" id="bg" />
        <img v-if="image" :src="image" :style="a" id="a" />
        <img v-if="image" :src="image" :style="b" id="b" />
        <img v-if="image" :src="image" :style="c" id="c" />
        <img src="./shadow.png" id="shadow" />
      </div>
      <b-form-group label="画像">
        <b-form-file accept="image/png" @change="handle" />
        <small>正方形のpng画像を利用してください</small>
      </b-form-group>
      <b-form-group label="スケール">
        <b-form-input type="number" v-model="scale" min="0.1" step="0.05" />
      </b-form-group>
      <b-form-group label="左表示位置">
        <b-input-group>
          <b-form-input type="number" v-model="pos_a.x" step="1" />
          <b-form-input type="number" v-model="pos_a.y" step="1" />
        </b-input-group>
      </b-form-group>
      <b-form-group label="右表示位置">
        <b-input-group>
          <b-form-input type="number" v-model="pos_b.x" step="1" />
          <b-form-input type="number" v-model="pos_b.y" step="1" />
        </b-input-group>
      </b-form-group>
      <b-form-group>
        <b-button variant="primary" @click="save">保存</b-button>
      </b-form-group>
    </b-container>
  </div>
</template>
<script>
import htmlToImage from "html-to-image";
import download from "downloadjs";
export default {
  name: "App",
  data() {
    return {
      image: null,
      name: "kanban",
      scale: 1,
      pos_a: {
        x: 9,
        y: 16
      },
      pos_b: {
        x: 9,
        y: 16
      }
    };
  },
  methods: {
    handle(e) {
      const file = e.target.files.item(0);

      if (!file) {
        return;
      }

      this.name = file.name;

      const reader = new FileReader();
      reader.onload = e => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    save() {
      htmlToImage.toPng(this.$refs.draw).then(data => {
        download(data, `kanban-${this.name}.png`);
      });
    }
  },
  computed: {
    bg() {
      return {
        "background-image": "url(./img/base.png)"
      };
    },
    a() {
      return {
        transform: "skew(0, 26.7deg)",
        width: `${48 * this.scale}px`,
        height: `${48 * this.scale}px`,
        bottom: `${this.pos_a.y}px`,
        left: `${this.pos_a.x}px`
      };
    },
    b() {
      return {
        transform: "skew(0, -26.7deg)",
        width: `${48 * this.scale}px`,
        height: `${48 * this.scale}px`,
        bottom: `${this.pos_b.y}px`,
        left: `${192 + parseInt(this.pos_b.x)}px`
      };
    },
    c() {
      return {
        margin: "4px",
        width: `24px`,
        height: `24px`
      };
    }
  }
};
</script>
<style lang="scss" scoped >
#app {
  .braw {
    position: relative;
    display: inline-block;
  }

  #bg {
    height: 128px;
    width: 512px;
  }
  #a,
  #b {
    position: absolute;
  }
  #c {
    position: absolute;
    top: 0;
    left: 256px;
  }
  #shadow {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.1;
  }
}
</style>