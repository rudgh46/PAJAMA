package com.c203.api.service;

import com.c203.api.dto.Picture.PictureRegistDto;

public interface PictureService {
    boolean registPicture(PictureRegistDto pictureRegistDto) throws Exception;
}
