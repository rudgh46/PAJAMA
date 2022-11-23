package com.c203.api.service;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Base64;

@Service
public class EncryptionSerivceImpl implements EncryptionService{

    public static String alg = "AES/CBC/PKCS5Padding";  // 인코딩 방식
    private final String key = "01234567890123456789012345678901";
    private final String iv = key.substring(0, 16); // 16byte

    // 룸 번호 암호화를 위함
    // 인코딩
    @Override
    public String encrypt(String text) throws Exception {
        Cipher cipher = Cipher.getInstance(alg);
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
        IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParamSpec);

        byte[] encrypted = cipher.doFinal(text.getBytes("UTF-8"));
        String encryptedString = Base64.getEncoder().encodeToString(encrypted);

        //URI 인코딩
        String uriencoded = URLEncoder.encode(encryptedString,"UTF-8");
        return uriencoded;
    }

    // 디코딩
    @Override
    public String decrypt(String cipherText) throws Exception {
        Cipher cipher = Cipher.getInstance(alg);
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
        IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParamSpec);

        // URI 디코딩
        cipherText = URLDecoder.decode(cipherText, "UTF-8");

        byte[] decodedBytes = Base64.getDecoder().decode(cipherText);
        byte[] decrypted = cipher.doFinal(decodedBytes);
        String decrptedString = new String(decrypted, "UTF-8");
        return decrptedString;
    }
}