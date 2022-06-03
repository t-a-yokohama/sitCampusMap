//
//  DeviceHeading.m
//  sitcampusmap
//
//  Created by 高橋歩希 on 2022/05/31.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DeviceHeading,NSObject)

  RCT_EXTERN_METHOD(watchHeading: (RCTResponseSenderBlock) callback)
  RCT_EXTERN_METHOD(stop)

@end
