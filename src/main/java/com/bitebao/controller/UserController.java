package com.bitebao.controller;

import com.bitebao.dto.SuccessResponseDto;


import com.bitebao.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/*@Api(tags = "MvWatermarkController", description = "影片logo相關Api")*/
@RestController
@RequestMapping("/rest/mvWatermark")
public class UserController {
    /*    @ApiOperation(value = "尋找預設浮水印", notes = "取得預設浮水印圖檔相關資料(位置、圖片位置、偏移量等)")*/
    @GetMapping(path = "findDefaultMvWatermark")
    public ResponseEntity<SuccessResponseDto> findDefaultMvWatermark() {
        return ResponseUtil.successOutputResult(null);
    }
}
