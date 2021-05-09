<script>
import { Bar } from "vue-chartjs";
export default {
    extends: Bar,
    props: {
        data: {
            type: Object,
            default: null,
        },
        options: {
            type: Object,
            default: null,
        },
    },
    watch: {
        data: function () {
            this._chart.destroy();
            this.renderChart(this.data, this.options);
        },
    },
    mounted() {
        this.renderChart(this.data, this.options);
    },
};
</script>

<style></style>
