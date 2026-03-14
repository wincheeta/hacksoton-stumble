export default function pubCrawl() {
    return (
      <div>
        {/* <div>
          <title>Distance Matrix Service</title>

          <link rel="stylesheet" type="text/css" href="./style.css" />
          <script type="module" src="./index.js"></script>
        </div> */}
        <div>
          <div id="container">
            <div id="map"></div>
            <div id="sidebar">
              <h3>Request</h3>
              <pre id="request"></pre>
              <h3>Response</h3>
              <pre id="response"></pre>
            </div>
          </div>
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"
            defer
          ></script>
        </div>
      </div>
    )
}