<script>
import DOMPurify from "dompurify";

export default {
  name: "MarkdownRender",
  props: {
    text: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      loaded: false,
      marked: null,
    };
  },
  computed: {
    html() {
      if (this.text) {
        return DOMPurify.sanitize(
          this.marked.parse(this.text, {
            renderer: this.markedRenderer,
            breaks: true,
          })
        );
      }
      return "";
    },
  },
  async mounted() {
    const marked = await import(/* webpackChunkName: "markdown" */ "marked");

    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link;

    const base = this.$router
      ? this.$router.resolve(this.$route).href.replace(/#.*$/, "")
      : "";

    renderer.link = function (href, title, text) {
      let external = true;

      // Relative links don't work, since they aren't relative to the dashboard page
      if (href.startsWith("./")) {
        return text;
      }

      if (href.startsWith("#")) {
        href = `${base}${href}`;
        external = false;
      }

      const rendered = linkRenderer.call(this, href, title, text);

      if (external) {
        return rendered.replace(
          /^<a /,
          '<a target="_blank" rel="nofollow noopener noreferrer" '
        );
      }

      return rendered;
    };

    this.marked = marked;
    this.markedRenderer = renderer;
    this.loaded = true;
  },
};
</script>

<template>
  <p v-if="loaded" class="issue-text" v-html="html"></p>
</template>

<style lang="scss">
.issue-text {
  img {
    max-width: 100%;
  }

  pre {
    overflow-x: auto;
    background: rgb(246, 248, 250);
    color: #000;
    padding: 2rem;
    border-radius: 6px;
    margin-bottom: 1rem;

    code {
      padding: 0;
      margin: 0;
      line-height: 1rem;
      word-wrap: normal;
      background-color: transparent !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.issue-text {
  line-height: 1.5rem;
}
</style>
