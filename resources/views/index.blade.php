<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <base href="/">

  <link rel="shortcut icon" href="favicon.ico">

  <title>{{env('APP_NAME')}}</title>
</head>
<body>
<div id="app">
</div>
<script>
  
  var apartments = <?php echo json_encode($apartments, JSON_HEX_TAG); ?>;
  apartments.forEach(el => {
    el.floor = (parseInt(el.floor)+1).toString() + 'F';
  });
  var rooms = Array.from([...new Set(apartments.map(apartment => apartment.rooms))]).sort();
  var floor = Array.from([...new Set(apartments.map(apartment => apartment.floor))]).sort();
</script>
<script src="{{mix('frontend/js/runtime.js', 'frontend')}}"></script>
<script src="{{mix('frontend/js/vendor.js', 'frontend')}}"></script>
<script src="{{mix('frontend/js/main.js', 'frontend')}}"></script>

</body>
</html>
