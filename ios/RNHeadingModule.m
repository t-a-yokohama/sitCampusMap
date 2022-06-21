//
//  DeviceHeading.m
//  sitcampusmap
//
//  Created by 高橋歩希 on 2022/05/31.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNHeadingModule,NSObject)

  RCT_EXTERN_METHOD(start)
  RCT_EXTERN_METHOD(getHeading: (RCTResponseSenderBlock) callback)
  RCT_EXTERN_METHOD(stop)

@end
