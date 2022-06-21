//
//  DeviceHeading.swift
//  sitcampusmap
//
//  Created by 高橋歩希 on 2022/05/31.
//

import UIKit
import Foundation
import CoreLocation

@objc(RNHeadingModule) class RNHeadingModule: NSObject, CLLocationManagerDelegate {
  
  var mLocationManager: CLLocationManager!
  var azimuth: Double = 0
  
  override init() {
    super.init()
    mLocationManager = CLLocationManager()
    mLocationManager.requestWhenInUseAuthorization()
    mLocationManager.headingFilter = kCLHeadingFilterNone
    mLocationManager.delegate = self
  }
  
  @objc public func getHeading(_ callback: RCTResponseSenderBlock) {
    callback([azimuth])
  }
  
  func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
    if newHeading.trueHeading == -1 {
      azimuth = newHeading.magneticHeading
      
    } else {
      azimuth = newHeading.trueHeading
    }
  }
  
  @objc public func start() {
    mLocationManager.startUpdatingHeading()
  }
  
  @objc public func stop() {
    mLocationManager.stopUpdatingHeading()
  }
  
}
