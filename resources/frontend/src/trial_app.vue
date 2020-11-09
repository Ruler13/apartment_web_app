<template lang="pug">
  .trial-app
    br
    h3(align='center') Apartment Data
    br
    form(method='get' action="")
      p Select floor:
      div(v-for='floor in floor').checkbox-inline

        input(type='checkbox'  v-bind:id='floor' v-bind:value='floor' v-model="floorFilter").hidden-cb
        label(v-bind:for='floor') {{floor}}
      br
      br
      p Select rooms:
      div(v-for='room in rooms').checkbox-inline
        input(type='checkbox'  v-bind:id='room' v-bind:value='room' v-model="roomsFilter").hidden-cb
        label(v-bind:for='room') {{room}}
      br 
    br
    table.table
      tr
        th ID
        th Name
        th Size
        th Price
        th Rooms
        th Floor
      
      tr(v-for='apartment in apartmentsFilter')
          th {{ apartment.id }}
          th {{ apartment.name }}
          th {{ apartment.size }}
          th {{ apartment.price }}
          th {{ apartment.rooms }}
          th {{ apartment.floor }}
</template>

<style lang="sass" scoped>

</style>

<script>

export default {
  name: 'TrialApp',
  components: {},
  props: {
    apartments: Array,
    rooms: Array,
    floor: Array,
  },

  data () {
    return {
        roomsFilter: [],
        floorFilter: [],
    };
  },
  computed: {
    apartmentsFilter: function() {
        var roomsFilter = this.roomsFilter;
        var floorFilter = this.floorFilter;
        var roomsFiltered = []
        var ret = [];
        if (roomsFilter.length == 0){
          roomsFiltered = this.apartments;
        }else{
          for (var apartment of this.apartments){
            if(roomsFilter.includes(apartment.rooms) ){
                roomsFiltered.push(apartment);
            }
          }
        }
        if (floorFilter.length == 0){
          ret = roomsFiltered;
        }else{
          for (var apartment of roomsFiltered){
            if(floorFilter.includes(apartment.floor) ){
                ret.push(apartment);
            }
          }
        }
        
        return ret;
    }
  },
  watch: {},
  methods: {},
};
</script>
