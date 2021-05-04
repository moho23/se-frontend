import React, {useState} from "react";
import Mapir from "mapir-react-component";

const Map = Mapir.setToken({
    interactive:true,
  transformRequest: (url)=> {
      return {
          url: url,
          headers: { 
              'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJmNTFlOTBjMjRhZmE3YmVhYzRjY2FlMjVkN2IxNjFmZDEzYzliMjIwZDc0NTg4OGY5M2Q5ZDdkNTc5MTM3ZTVhY2JhMTY3MTBjZWQ3OWRhIn0.eyJhdWQiOiIxMzUzNyIsImp0aSI6IjJmNTFlOTBjMjRhZmE3YmVhYzRjY2FlMjVkN2IxNjFmZDEzYzliMjIwZDc0NTg4OGY5M2Q5ZDdkNTc5MTM3ZTVhY2JhMTY3MTBjZWQ3OWRhIiwiaWF0IjoxNjE4MzIzMzcyLCJuYmYiOjE2MTgzMjMzNzIsImV4cCI6MTYyMDkxNTM3Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.HoKU6OckiAbRBHCc2gd6yKIRGmCqmpEX57KDMvBVpKtGdXYf0NbyvElcA_ATjtfedpujXSmoNZvoRkPPQX8rpyWtbM1UfgTY4iJEQU6qvjdodI1DOpQlYsJrG2JXcwHtTIMAoSoWez_U5yBxzCQH7dRb_10y2Sqtm787wyoLqmVCSqUbhYQd3sBwBXNVnVd0mDle0Wn8Xarg8DHhJRW_s6CIZSJtAPGGQdp1iB7K5lGMNPxOCbGg3zMeSZ5WteyThWxnddeAbYxMDRLuhDTv2X26nNqswLiptRfg9ioryBBTs2HllJNBH-aeh2qccPvfA27GzQuObBBAOC5s9fwh5Q', //Mapir access token
              'Mapir-SDK': 'reactjs'
          }
      }

  }
});

export default Map;