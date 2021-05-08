<template>
    <DataTable :data="tableData"/>
</template>

<script>
import DataTable from "../components/Table";
export default {
    components: {
        DataTable,
    },
    data: () => ({
      tableData: {

      }
    })
};
</script>

<style></style>
