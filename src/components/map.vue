<template>
  <div id="mapContainer" ></div>
</template>

<script>
export default {
  data() {
    return {
      clientHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    var map = new BMap.Map("mapContainer");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    map.addControl(new BMap.GeolocationControl());

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          console.log("您的位置：" + r.point.lng + "," + r.point.lat);
        } else {
          console.log("failed " + this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );
    var search = new BMap.LocalSearch();
    search.search("武汉");
  }
};
</script>

<style scoped>
#mapContainer {
  height: 100%;
}
</style>

