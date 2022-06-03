//
//  DeviceHeading.swift
//  sitcampusmap
//
//  Created by 高橋歩希 on 2022/05/31.
//

import UIKit
import Foundation
import CoreLocation

@objc(DeviceHeading) class DeviceHeading: NSObject, CLLocationManagerDelegate {
  
  var myLocationManager: CLLocationManager!
  
  @objc public func watchHeading(_ callback: RCTResponseSenderBlock) {
    myLocationManager = CLLocationManager()
    myLocationManager.delegate = self
    myLocationManager.startUpdatingHeading()
    
    func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
      if newHeading.trueHeading == -1 {
        callback([newHeading.magneticHeading])
      } else {
        callback([newHeading.trueHeading])
      }
    }
  }
  
  @objc public func stop() {
    myLocationManager.stopUpdatingHeading()
  }
  
}
