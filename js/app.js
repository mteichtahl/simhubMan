/**
 * Apron - 04R
 * lat: 40.62542555 / 40:37.321265N
 * lng: -73.77034721666667 / -73:47.135063W
 *
 * 10NM 44
 * lat: 40.74188833333333N / 40:28.7408
 * lng: -73.89807N/ -73:53.8842
 */

function drawApproach (paper) {
  console.log('drawing approach')

  var horizontalOffset = 50
  var canvasWidth = paper.canvas.clientWidth - horizontalOffset
  var canvasHeight = paper.canvas.clientHeight
  var numberOfSegments = 10
  var segmentWidth = (canvasWidth - horizontalOffset) / numberOfSegments

  var x = 100
  var y = canvasHeight - 40

  paper.rect(x, y, 665, 20).attr({ fill: '#ebebeb' })
  /** draw left vertical */
  var tenNMLine = paper.path(`M100 40L100 ${canvasHeight - 40}`)
  tenNMLine.attr({ 'stroke': '#8c8c8c', 'stroke-dasharray': '--', 'stroke-width': '1.0' })
  /** 2000 foot text */
  paper.text(x - 30, y - 400, '2000').attr({ 'font-size': '24px', 'font-weight': '200', 'text-decoration': 'underline' })
  paper.path(`M${x-58} ${y-385}L ${x-3} ${y-385}`)

  /** 1500 feet */
  paper.rect(x + 665, y, 565, 20).attr({ fill: '#ebebeb' })
  paper.text(x + 665, y - 320, '1500').attr({ 'font-size': '18px', 'font-weight': '200', 'text-decoration': 'underline' })
  paper.text(x + 665, y - 285, 'X').attr({ 'font-size': '24px', 'font-weight': '800', 'text-decoration': 'underline' })

  /** line from 2000 feet to 1500 feet */
  var lineOne = paper.path(`M${x} ${y - 385}L ${x + 660} ${y - 285}`)
    .attr({ 'stroke': '#000000', 'stroke-width': '2.0', 'arrow-end': 'classic-wide-long'})

  var text = paper.text(x + 300, y - 340, '045°').attr({ 'font-size': '18px', 'font-weight': '200' }).rotate(10)
  var box = text.getBBox()
  var rect = paper.rect(box.x, box.y, box.width, box.height).attr({ 'fill': 'white', 'stroke': 'white' })
  text.toFront()

  paper.rect(x + 1230, y, 170, 20).attr({ fill: '#ebebeb' })
  paper.rect(x + 1400, y, 170, 20).attr({ fill: '#ebebeb' })

  /** runway rectangle */
  paper.rect(x + 1400, y , 80, 10).attr({ fill: '#000000' })

  // /** Draw the base line */
  // // for (var i = 0; i < numberOfSegments; i++) {

  // // // var text = paper.text(x, y + 30, (numberOfSegments - i).toFixed(0).toString())
  // // // text.attr({ 'font-size': 16, 'font-family': 'Arial, Helvetica, sans-serif' })
  // // }

  // /** draw 6NM vertical */
  // var sixNM = (4 / numberOfSegments) * canvasWidth + 80
  // var sixNMLine = paper.path(`M${sixNM} 40L${sixNM} ${canvasHeight - 40}`)
  // sixNMLine.attr({ 'stroke': '#8c8c8c', 'stroke-dasharray': '--', 'stroke-width': '1.0' })

  // /** draw 6NM vertical */
  // var threeNM = (7 / numberOfSegments) * canvasWidth + 130
  // var threeNMLine = paper.path(`M${threeNM} 40L${threeNM} ${canvasHeight - 40}`)
  // threeNMLine.attr({ 'stroke': '#8c8c8c', 'stroke-dasharray': '--', 'stroke-width': '1.0' })

// /** draw 6NM vertical */
// var oneNM = (8 / numberOfSegments) * canvasWidth + 130
// var oneNMLine = paper.path(`M${oneNM} 40L${oneNM} ${canvasHeight - 40}`)
// oneNMLine.attr({ 'stroke': '#8c8c8c', 'stroke-dasharray': '--', 'stroke-width': '1.0' })
}

var KJFK4R_location = {
  lat: 40.62542555,
  lng: -73.77034721666667
}

var KJFK4R_TenNM = {
  lat: 40.49901333333333,
  lng: -74.0500
}

$(document).ready(function () {
  var $bodyEl = $('body')
  var $sidedrawerEl = $('#sidedrawer')

  // $('#approachDiagram').load('images/chart.svg')

  var paper = new Raphael(document.getElementById('approachDiagram'), '100%', '95%')
  paper.image('images/chart.svg', 0, 0, 1024, 520)
  // drawApproach(paper)

  map = new GMaps({
    div: '#map',
    lat: 40.62542555,
    lng: -73.77034721666667,
    zoom: 10,
    type: 'satellite',
    zoomControl: true,
    panControl: true
  })

  map.addMarker({
    lat: KJFK4R_location.lat,
    lng: KJFK4R_location.lng,
    title: 'KJFK',
    infoWindow: {
      content: '<p><strong>KJFK 04R</strong></p><p>Dimensions: 	8400 x 200 ft.</p><p>Elevation: 	11.8 ft.</p><p>Approach Nav: 109.50</p><p>VOR/DME: 115.90</p>'
    }

  })

  var triangle = 'M150 0 L75 200 L225 200 Z'
  var line = [
    [KJFK4R_location.lat, KJFK4R_location.lng],
    [KJFK4R_TenNM.lat, KJFK4R_TenNM.lng]
  ]

  map.addMarker({
    lat: KJFK4R_TenNM.lat,
    lng: KJFK4R_TenNM.lng,
    icon: {
      path: triangle,
      fillColor: 'rgb(0,0,0)',
      fillOpacity: 1,
      strokeColor: 'white',
      scale: 0.25,
      rotation: 44
    },
    title: 'aircraft'
  })

  map.drawPolyline({
    path: line,
    strokeColor: '#131540',
    strokeOpacity: 0.6,
    strokeWeight: 3
  })

  function showSidedrawer () {
    // show overlay
    var options = {
      onclose: function () {
        $sidedrawerEl
          .removeClass('active')
          .appendTo(document.body)
      }
    }

    var $overlayEl = $(mui.overlay('on', options))

    // show element
    $sidedrawerEl.appendTo($overlayEl)
    setTimeout(function () {
      $sidedrawerEl.addClass('active')
    }, 20)
  }

  function hideSidedrawer () {
    $bodyEl.toggleClass('hide-sidedrawer')
  }

  var $titleEls = $('strong', $sidedrawerEl)

  $titleEls
    .next()
    .hide()

  // hideSidedrawer()

  $titleEls.on('click', function () {
    $(this).next().slideToggle(200)
  })

  $('.js-show-sidedrawer').on('click', showSidedrawer)
  $('.js-hide-sidedrawer').on('click', hideSidedrawer)
})
