---
layout: post
title: 常用加密算法（Java实现）
subtitle:
date: 2021-12-13
permalinkPattern: /post/:year/:month/:day/:slug/
useHeaderImage: true
tags: [Java, Security, Algorithm]
---

## BASE64 加密/解密

Base64 编码是我们程序开发中经常使用到的编码方法，它用 64 个可打印字符来表示二进制数据。这 64 个字符是：小写字母 a-z、大写字母 A-Z、数字 0-9、符号 “+”、“/”（再加上作为垫字的 “=”，实际上是 65 个字符），其他所有符号都转换成这个字符集中的字符。Base64 编码通常用作存储、传输一些二进制数据编码方法，所以说它本质上是一种将二进制数据转成文本数据的方案。

通常用作对二进制数据进行加密，示例：

```java
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class Base64Util {

  /***
   * BASE64解密
   * @param key
   * @return
   * @throws Exception
   */
  public static byte[] decryBASE64(String key) throws Exception{
    return (new BASE64Decoder()).decodeBuffer(key);
  }

  /***
   * BASE64加密
   * @param key
   * @return
   * @throws Exception
   */
  public static String encryptBASE64(byte[] key) throws Exception{
    return (new BASE64Encoder()).encode(key);
  }
}
```

## MD5(Message Digest Algorithm)加密

MD5 是将任意长度的数据字符串转化成短小的固定长度的值的单向操作，任意两个字符串不应有相同的散列值。因此 MD5 经常用于校验字符串或者文件。

MD5 主要用做数据一致性验证、数字签名和安全访问认证，而不是用作加密。一般经过 MD5 编码，更安全的做法还会加一层盐。

```java
import java.security.MessageDigest;

public class MD5Util {

  public static final String KEY_MD5 = "MD5";

  /***
   * MD5加密（生成唯一的MD5值）
   * @param data
   * @return
   * @throws Exception
   */
  public static byte[] encryMD5(byte[] data) throws Exception {
    MessageDigest md5 = MessageDigest.getInstance(KEY_MD5);
    md5.update(data);
    return md5.digest();
  }
}
```

## DES(Data Encryption Standard)对称加密/解密

DES 加密算法出自 IBM 的研究，后来被美国政府正式采用，之后开始广泛流传。但近些年使用越来越少，因为 DES 使用 56 位密钥，以现代的计算能力，24 小时内即可被破解。

顺便说一下 3DES（Triple DES），它是 DES 向 AES 过渡的加密算法，使用 3 条 56 位的密钥对数据进行三次加密。是 DES 的一个更安全的变形。它以 DES 为基本模块，通过组合分组方法设计出分组加密算法。比起最初的 DES，3DES 更为安全。

使用 Java 实现 DES 加密解密，注意密码长度要是 8 的倍数。加密和解密的 Cipher 构造参数一定要相同，不然会报错。

数据加密标准算法,和 BASE64 最明显的区别就是有一个工作密钥，该密钥既用于加密、也用于解密，并且要求密钥是一个长度至少大于 8 位的字符串，示例：

```java
import java.security.Key;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class DesUtil {

  private static Key key;

  private static String KEY_STR="myKey";
  private static String CHARSETNAME="UTF-8";
  private static String ALGORITHM="DES";

  static {
    try {
      //生成DES算法对象
      KeyGenerator generator=KeyGenerator.getInstance(ALGORITHM);
      //运用SHA1安全策略
      SecureRandom secureRandom=SecureRandom.getInstance("SHA1PRNG");
      //设置上密钥种子
      secureRandom.setSeed(KEY_STR.getBytes());
      //初始化基于SHA1的算法对象
      generator.init(secureRandom);
      //生成密钥对象
      key=generator.generateKey();
      generator=null;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  /***
   * 获取加密的信息
   * @param str
   * @return
   */
  public static String getEncryptString(String str) {
    //基于BASE64编码，接收byte[]并转换成String
    BASE64Encoder encoder = new BASE64Encoder();
    try {
      //按utf8编码
      byte[] bytes = str.getBytes(CHARSETNAME);
      //获取加密对象
      Cipher cipher = Cipher.getInstance(ALGORITHM);
      //初始化密码信息
      cipher.init(Cipher.ENCRYPT_MODE, key);
      //加密
      byte[] doFinal = cipher.doFinal(bytes);
      //byte[]to encode好的String 并返回
      return encoder.encode(doFinal);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  /***
   * 获取解密之后的信息
   * @param str
   * @return
   */
  public static String getDecryptString(String str) {
    BASE64Decoder decoder = new BASE64Decoder();
    try {
      //将字符串decode成byte[]
      byte[] bytes = decoder.decodeBuffer(str);
      //获取解密对象
      Cipher cipher = Cipher.getInstance(ALGORITHM);
      //初始化解密信息
      cipher.init(Cipher.DECRYPT_MODE, key);
      //解密
      byte[] doFial = cipher.doFinal(bytes);

      return new String(doFial, CHARSETNAME);

    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

}
```

## AES（Advanced Encryption Standard） 加密/解密

高级加密标准（英语：Advanced Encryption Standard，缩写：AES），在密码学中又称 Rijndael 加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的 DES，已经被多方分析且广为全世界所使用。简单说就是 DES 的增强版，比 DES 的加密强度更高。

AES 与 DES 一样，一共有四种加密模式：电子密码本模式（ECB）、加密分组链接模式（CBC）、加密反馈模式（CFB）和输出反馈模式（OFB）。关于加密模式的介绍，推荐这篇文章：[高级加密标准 AES 的工作模式（ECB、CBC、CFB、OFB）](https://links.jianshu.com/go?to=https://blog.poxiao.me/p/advanced-encryption-standard-and-block-cipher-mode/)

```java
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AESUtil {

  public static final String algorithm = "AES";
  // AES/CBC/NOPaddin
  // AES 默认模式
  // 使用CBC模式, 在初始化Cipher对象时, 需要增加参数, 初始化向量IV : IvParameterSpec iv = new
  // IvParameterSpec(key.getBytes());
  // NOPadding: 使用NOPadding模式时, 原文长度必须是8byte的整数倍
  public static final String transformation = "AES/CBC/NOPadding";
  public static final String key = "1234567812345678";

  /***
   * 加密
   * @param original 需要加密的参数（注意必须是16位）
   * @return
   * @throws Exception
   */
  public static String encryptByAES(String original) throws Exception {
    // 获取Cipher
    Cipher cipher = Cipher.getInstance(transformation);
    // 生成密钥
    SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), algorithm);
    // 指定模式(加密)和密钥
    // 创建初始化向量
    IvParameterSpec iv = new IvParameterSpec(key.getBytes());
    cipher.init(Cipher.ENCRYPT_MODE, keySpec, iv);
    // cipher.init(Cipher.ENCRYPT_MODE, keySpec);
    // 加密
    byte[] bytes = cipher.doFinal(original.getBytes());

    return Base64Util.encryptBASE64(bytes);
  }

  /**
   * 解密
   * @param encrypted 需要解密的参数
   * @return
   * @throws Exception
   */
  public static String decryptByAES(String encrypted) throws Exception {
    // 获取Cipher
    Cipher cipher = Cipher.getInstance(transformation);
    // 生成密钥
    SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), algorithm);
    // 指定模式(解密)和密钥
    // 创建初始化向量
    IvParameterSpec iv = new IvParameterSpec(key.getBytes());
    cipher.init(Cipher.DECRYPT_MODE, keySpec, iv);
    // cipher.init(Cipher.DECRYPT_MODE, keySpec);
    // 解密
    byte[] bytes = cipher.doFinal(Base64Util.decryBASE64(encrypted));

    return new String(bytes);
  }

}
```

## HMAC(Hash Message Authentication Code，散列消息鉴别码)

使用一个密钥生成一个固定大小的小数据块，即 MAC，并将其加入到消息中，然后传输。接收方利用与发送方共享的密钥进行鉴别认证，示例：

```java
import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class HMACUtil {

  public static final String KEY_MAC = "HmacMD5";

  /***
   * 初始化HMAC密钥
   * @return
   * @throws Exception
   */
  public static String initMacKey() throws Exception{

    KeyGenerator keyGenerator = KeyGenerator.getInstance(KEY_MAC);
    SecretKey secreKey = keyGenerator.generateKey();
    return Base64Util.encryptBASE64(secreKey.getEncoded());
  }

  /**
   * HMAC加密
   * @param data
   * @param key
   * @return
   * @throws Exception
   */
  public static byte[] encryHMAC(byte[] data, String key) throws Exception{
    SecretKey secreKey = new SecretKeySpec(Base64Util.decryBASE64(key), KEY_MAC);
    Mac mac = Mac.getInstance(secreKey.getAlgorithm());
    mac.init(secreKey);
    return mac.doFinal();
  }

}
```

## 恺撒加密

它是一种替换加密的技术，明文中的所欲字母都在字母表上向后（或向前）按照一个固定的数目进行偏移后被替换成密文。

例如：当偏移量是 3 的时候，所有的字母 A 将被替换成 D，B 变成 E，以此类推。

**恺撒密码通常被座位其他更复杂的加密方法中的一个步骤**

```java
public class KaisaUtil {

  /***
   * 使用凯撒加密方式加密数据
   * @param orignal 原文
   * @param key 密钥
   * @return 加密后的字符
   */
  private static String encryptKaisa(String orignal, int key) {
    //将字符串转换为数组
    char[] chars = orignal.toCharArray();
    StringBuffer buffer = new StringBuffer();
    //遍历数组
    for(char aChar : chars) {
      //获取字符的ASCII编码
      int asciiCode = aChar;
      //偏移数据
      asciiCode += key;
      //将偏移后的数据转为字符
      char result = (char)asciiCode;
      //拼接数据
      buffer.append(result);
    }
    return buffer.toString();
  }

  /**
   * 使用凯撒加密方式解密数据
   *
   * @param encryptedData :密文
   * @param key           :密钥
   * @return : 源数据
   */
  private static String decryptKaiser(String encryptedData, int key) {
      // 将字符串转为字符数组
      char[] chars = encryptedData.toCharArray();
      StringBuilder sb = new StringBuilder();
      // 遍历数组
      for (char aChar : chars) {
          // 获取字符的ASCII编码
          int asciiCode = aChar;
          // 偏移数据
          asciiCode -= key;
          // 将偏移后的数据转为字符
          char result = (char) asciiCode;
          // 拼接数据
          sb.append(result);
      }

      return sb.toString();
  }

  public static void main(String[] args) {
    String str = "open fire";
    String encode = encryptKaisa(str, 3);
    System.out.println("加密后："+encode);

    String decode = decryptKaiser(encode, 3);
    System.out.println("解密后："+decode);

  }

}
```

## SHA(Secure Hash Algorithm，安全散列算法)

SHA 全名叫做安全散列算法，是 FIPS 所认证的安全散列算法。能计算出一个数字消息所对应到的，长度固定的字符串（又称消息摘要）的算法。且若输入的消息不同，它们对应到不同字符串的机率很高。

数字签名等密码学应用中重要的工具，被广泛地应用于电子商务等信息安全领域

```java
import java.security.MessageDigest;

public class SHAUtil {

  public static final String KEY_SHA = "SHA";
    public static final String ALGORITHM = "SHA-256";

  /***
   * SHA加密（比MD5更安全）
   * @param data
   * @return
   * @throws Exception
   */
  public static byte[] encryptSHA(byte[] data) throws Exception{
    MessageDigest sha = MessageDigest.getInstance(KEY_SHA);
    sha.update(data);
    return sha.digest();
  }

  public static String SHAEncrypt(final String content) {
        try {
            MessageDigest sha = MessageDigest.getInstance(KEY_SHA);
            byte[] sha_byte = sha.digest(content.getBytes());
            StringBuffer hexValue = new StringBuffer();
            for (byte b : sha_byte) {
                //将其中的每个字节转成十六进制字符串：byte类型的数据最高位是符号位，通过和0xff进行与操作，转换为int类型的正整数。
                String toHexString = Integer.toHexString(b & 0xff);
                hexValue.append(toHexString.length() == 1 ? "0" + toHexString : toHexString);
            }
            return hexValue.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
       return "";
    }

    //SHA-256加密
    public static String SHA256Encrypt(String sourceStr) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance(ALGORITHM);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        if (null != md) {
            md.update(sourceStr.getBytes());
            String digestStr = getDigestStr(md.digest());
            return digestStr;
        }

        return null;
    }

    private static String getDigestStr(byte[] origBytes) {
        String tempStr = null;
        StringBuilder stb = new StringBuilder();
        for (int i = 0; i < origBytes.length; i++) {
            tempStr = Integer.toHexString(origBytes[i] & 0xff);
            if (tempStr.length() == 1) {
                stb.append("0");
            }
            stb.append(tempStr);

        }
        return stb.toString();
    }
}
```

## RSA 加密/解密

RSA 算法是一种非对称加密算法，所谓非对称就是该算法需要一对密钥，若使用其中一个加密，则需要用另一个才能解密。目前它是最有影响力和最常用的公钥加密算法，能够抵抗已知的绝大多数密码攻击。从提出到现今的三十多年里，经历了各种攻击的考验，逐渐为人们接受，普遍认为是目前最优秀的公钥方案之一。

使用 RSA 加密主要有这么几步：生成密钥对、公开公钥、公钥加密私钥解密、私钥加密公钥解密。

```java
import com.sun.org.apache.xml.internal.security.utils.Base64;
import javax.crypto.Cipher;

import org.apache.commons.io.FileUtils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.charset.Charset;
import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

public class RsaUtil {

  /**
     * 生成密钥对并保存在本地文件中
     *
     * @param algorithm : 算法
     * @param pubPath   : 公钥保存路径
     * @param priPath   : 私钥保存路径
     * @throws Exception
     */
    private static void generateKeyToFile(String algorithm, String pubPath, String priPath) throws Exception {
        // 获取密钥对生成器
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(algorithm);
        // 获取密钥对
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        // 获取公钥
        PublicKey publicKey = keyPair.getPublic();
        // 获取私钥
        PrivateKey privateKey = keyPair.getPrivate();
        // 获取byte数组
        byte[] publicKeyEncoded = publicKey.getEncoded();
        byte[] privateKeyEncoded = privateKey.getEncoded();
        // 进行Base64编码
        String publicKeyString = Base64.encode(publicKeyEncoded);
        String privateKeyString = Base64.encode(privateKeyEncoded);
        // 保存文件
        FileUtils.writeStringToFile(new File(pubPath), publicKeyString, Charset.forName("UTF-8"));
        FileUtils.writeStringToFile(new File(priPath), privateKeyString, Charset.forName("UTF-8"));

    }

    /**
     * 从文件中加载公钥
     *
     * @param algorithm : 算法
     * @param filePath  : 文件路径
     * @return : 公钥
     * @throws Exception
     */
    private static PublicKey loadPublicKeyFromFile(String algorithm, String filePath) throws Exception {
        // 将文件内容转为字符串
        String keyString = FileUtils.readFileToString(new File(filePath), Charset.forName("UTF-8"));

        return loadPublicKeyFromString(algorithm, keyString);

    }

    /**
     * 从字符串中加载公钥
     *
     * @param algorithm : 算法
     * @param keyString : 公钥字符串
     * @return : 公钥
     * @throws Exception
     */
    private static PublicKey loadPublicKeyFromString(String algorithm, String keyString) throws Exception {
        // 进行Base64解码
        byte[] decode = Base64.decode(keyString);
        // 获取密钥工厂
        KeyFactory keyFactory = KeyFactory.getInstance(algorithm);
        // 构建密钥规范
        X509EncodedKeySpec keyspec = new X509EncodedKeySpec(decode);
        // 获取公钥
        return keyFactory.generatePublic(keyspec);

    }

    /**
     * 从文件中加载私钥
     *
     * @param algorithm : 算法
     * @param filePath  : 文件路径
     * @return : 私钥
     * @throws Exception
     */
    private static PrivateKey loadPrivateKeyFromFile(String algorithm, String filePath) throws Exception {
        // 将文件内容转为字符串
        String keyString = FileUtils.readFileToString(new File(filePath), Charset.forName("UTF-8"));
        return loadPrivateKeyFromString(algorithm, keyString);

    }

    /**
     * 从字符串中加载私钥
     *
     * @param algorithm : 算法
     * @param keyString : 私钥字符串
     * @return : 私钥
     * @throws Exception
     */
    private static PrivateKey loadPrivateKeyFromString(String algorithm, String keyString) throws Exception {
        // 进行Base64解码
        byte[] decode = Base64.decode(keyString);
        // 获取密钥工厂
        KeyFactory keyFactory = KeyFactory.getInstance(algorithm);
        // 构建密钥规范
        PKCS8EncodedKeySpec keyspec = new PKCS8EncodedKeySpec(decode);
        // 生成私钥
        return keyFactory.generatePrivate(keyspec);

    }

    /**
     * 使用密钥加密数据
     *
     * @param algorithm      : 算法
     * @param input          : 原文
     * @param key            : 密钥
     * @param maxEncryptSize : 最大加密长度(需要根据实际情况进行调整)
     * @return : 密文
     * @throws Exception
     */
    private static String encrypt(String algorithm, String input, Key key, int maxEncryptSize) throws Exception {
        // 获取Cipher对象
        Cipher cipher = Cipher.getInstance(algorithm);
        // 初始化模式(加密)和密钥
        cipher.init(Cipher.ENCRYPT_MODE, key);
        // 将原文转为byte数组
        byte[] data = input.getBytes();
        // 总数据长度
        int total = data.length;
        // 输出流
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        decodeByte(maxEncryptSize, cipher, data, total, baos);
        // 对密文进行Base64编码
        return Base64.encode(baos.toByteArray());

    }

    /**
     * 解密数据
     *
     * @param algorithm      : 算法
     * @param encrypted      : 密文
     * @param key            : 密钥
     * @param maxDecryptSize : 最大解密长度(需要根据实际情况进行调整)
     * @return : 原文
     * @throws Exception
     */
    private static String decrypt(String algorithm, String encrypted, Key key, int maxDecryptSize) throws Exception {
        // 获取Cipher对象
        Cipher cipher = Cipher.getInstance(algorithm);
        // 初始化模式(解密)和密钥
        cipher.init(Cipher.DECRYPT_MODE, key);
        // 由于密文进行了Base64编码, 在这里需要进行解码
        byte[] data = Base64.decode(encrypted);
        // 总数据长度
        int total = data.length;
        // 输出流
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        decodeByte(maxDecryptSize, cipher, data, total, baos);
        // 输出原文
        return baos.toString();

    }

    /**
     * 分段处理数据
     *
     * @param maxSize : 最大处理能力
     * @param cipher  : Cipher对象
     * @param data    : 要处理的byte数组
     * @param total   : 总数据长度
     * @param baos    : 输出流
     * @throws Exception
     */
    private static void decodeByte(int maxSize, Cipher cipher, byte[] data, int total, ByteArrayOutputStream baos) throws Exception {
        // 偏移量
        int offset = 0;
        // 缓冲区
        byte[] buffer;
        // 如果数据没有处理完, 就一直继续
        while (total - offset > 0) {
            // 如果剩余的数据 >= 最大处理能力, 就按照最大处理能力来加密数据
            if (total - offset >= maxSize) {
                // 加密数据
                buffer = cipher.doFinal(data, offset, maxSize);
                // 偏移量向右侧偏移最大数据能力个
                offset += maxSize;
            } else {
                // 如果剩余的数据 < 最大处理能力, 就按照剩余的个数来加密数据
                buffer = cipher.doFinal(data, offset, total - offset);
                // 偏移量设置为总数据长度, 这样可以跳出循环
                offset = total;
            }
            // 向输出流写入数据
            baos.write(buffer);
        }
    }
}
```

## PBE 加密/解密

PBE算法是对称加密算法的综合算法，常见算法PBEWithMD5AndDES,使用MD5和DES算法构建了PBE算法。将盐附加在口令上，通过消息摘要算法经过迭代获得构建密钥的基本材料，构建密钥后使用对称加密算法进行加密解密。

```java
import java.security.Key;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;

public class PBEUtil {

    public static final String ALGORITHM = "PBEWITHMD5andDES";

    public static final int ITERATION_COUNT = 100;

    public static byte[] initSalt() throws Exception{
        //实例化安全随机数
        SecureRandom random = new SecureRandom();
        return random.generateSeed(8);
    }

    /***
     * 转换密钥
     * @param password 密码
     * @return 密钥
     * @throws Exception
     */
    private static Key toKey(String password) throws Exception{
        //密钥材料
        PBEKeySpec keySpec = new PBEKeySpec(password.toCharArray());
        //实例化
        SecretKeyFactory factory = SecretKeyFactory.getInstance(ALGORITHM);
        //生成密钥
        return factory.generateSecret(keySpec);
    }

    /***
     * 加密
     * @param data 待加密数据
     * @param password 密钥
     * @param salt
     * @return
     * @throws Exception
     */
    public static byte[] encrypt(byte[] data, String password, byte[] salt) throws Exception{
        //转换密钥
        Key key = toKey(password);
        //实例化PBE参数材料
        PBEParameterSpec spec = new PBEParameterSpec(salt, ITERATION_COUNT);
        //实例化
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        //初始化
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);
        return cipher.doFinal(data);
    }

    /***
     * 解密
     * @param data 待解密数据
     * @param password 密钥
     * @param salt
     * @return
     * @throws Exception
     */
    public static byte[] decrypt(byte[] data, String password, byte[] salt) throws Exception{
        //转换密钥
        Key key = toKey(password);
        //实例化PBE参数材料
        PBEParameterSpec spec = new PBEParameterSpec(salt, ITERATION_COUNT);
        //实例化
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        //初始化
        cipher.init(Cipher.DECRYPT_MODE, key, spec);
        //执行操作
        return cipher.doFinal(data);
    }

    private static String showByteArray(byte[] data) {
        if(null == data) {
            return null;
        }
        StringBuilder sb = new StringBuilder();
        for(byte b : data) {
            sb.append(b).append(",");
        }
        sb.deleteCharAt(sb.length()-1);
        sb.append("");
        return sb.toString();
    }

    public static void main(String[] args) throws Exception{
        byte[] salt = initSalt();
        System.out.println("salt："+showByteArray(salt));
        String password = "1111";
        System.out.println("口令："+password);
        String data = "PBE数据";
        System.out.println("加密前数据：String:"+data);
        System.out.println("加密前数据：byte[]:"+showByteArray(data.getBytes()));

        byte[] encryptData = encrypt(data.getBytes(), password, salt);
        System.out.println("加密后数据：byte[]:"+showByteArray(encryptData));

        byte[] decryptData = decrypt(encryptData, password, salt);
        System.out.println("解密后数据: byte[]:"+showByteArray(decryptData));
        System.out.println("解密后数据: string:"+new String(decryptData));
    }
}
```

## 安全级别

| (Security Level) | 工作因素(Work Factor) | 算法(Algorithms) |
| ---------------- | --------------------- | ---------------- |
| 薄弱(Weak)       | O(240)                | DES, MD5         |
| 传统(Legacy)     | O(264)                | RC4, SHA-1       |
| 基准(Baseline)   | O(280)                | 3DES             |
| 标准(Standard)   | O(2128)               | AES-128, SHA-256 |
| 较高(High)       | O(2192)               | AES-192, SHA-384 |
| 超高(Ultra)      | O(2256)               | AES-256, SHA-512 |

参考了以下几篇文章，感谢

[https://www.jianshu.com/p/26adec49cb34](https://www.jianshu.com/p/26adec49cb34)

[https://www.jianshu.com/p/213d69ac27b3](https://www.jianshu.com/p/213d69ac27b3)

[https://blog.csdn.net/theUncle/article/details/100156976](https://blog.csdn.net/theUncle/article/details/100156976)
