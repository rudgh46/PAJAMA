package com.c203.api.service;

public interface EncryptionService {
    String encrypt(String text) throws Exception;
    String decrypt(String cipherText) throws Exception;
}
