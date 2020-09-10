package com.bitebao.utils;


import org.slf4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.*;

public class HostAddressUtils {
    /*	protected static Logger log = LogUtils.myVideoCenterLog;*/
    public static final int[] MAX_RANGE = new int[]{0, 255};

    private static Set<String> API_SAFE_IP_LIST = new HashSet<String>(Arrays.asList(new String[]{
            //928BET production ip
            "122.155.201.22",

            //GWIN test ip
            "183.81.167.9",

            //GWIN Live ip
            "49.128.87.9",
            "49.128.87.6",
            "49.128.87.10",

            //GWIN Office ip
            "113.161.74.45",
            "118.69.37.13"
    }));

    private static Set<String> OFFICE_SAFE_IP_LIST = new HashSet<String>(Arrays.asList(new String[]{
            "211.72.224.20", // neutec office
    }));

    private static HashMap<String, int[]> CLASS_C_OFFICE_SAFE_IP_LIST;

    static {
        CLASS_C_OFFICE_SAFE_IP_LIST = new HashMap<String, int[]>();
        CLASS_C_OFFICE_SAFE_IP_LIST.put("211.72.224", MAX_RANGE);
        CLASS_C_OFFICE_SAFE_IP_LIST.put("218.32.72", MAX_RANGE);
        CLASS_C_OFFICE_SAFE_IP_LIST.put("123.51.183", MAX_RANGE);
        CLASS_C_OFFICE_SAFE_IP_LIST.put("203.69.34", MAX_RANGE);

    }

    private static Set<String> SAFE_IP_LIST = new HashSet<String>(Arrays.asList(new String[]{
            "127.0.0.1", //
            "211.72.224.20",//neutec office
            //neutec VPN IP
            "211.72.224.19",
            "218.32.72.2",
            //System OP - neutec office
            "211.22.51.150",
            "220.228.146.90",
            "123.51.184.163",
            "203.69.34.179",
            //Business OP - home in Taiwan
            //Jet
            "1.34.162.98",
            "180.177.41.192",
            "61.230.51.71",
            //A Jack
            "123.192.169.5",
            "211.75.103.79",
            "211.75.103.80",
            "211.75.103.81",
            "211.75.103.82",
            "211.75.103.83",
            "211.75.103.84",
            //A Goh
            "118.163.98.163",
            //Network colleague home
            "218.32.213.95",//Moz 1
            "27.105.100.168",//Moz 2
            "220.134.5.176",//Kai
            "218.32.230.214",//Jerry
            // VN Boss home(越南股東(老闆)的家)
            "115.78.165.129"
    }));

    /**
     * 放入區段C的IP. EX : <211.72.224, -1> 表示 211.72.224.XXX 全部 <203.99.238,
     * 160-191> 表示 203.99.238.160 ~ 191
     */
    private static Map<String, int[]> CLASS_C_SAFE_IPs;

    static {
        CLASS_C_SAFE_IPs = new HashMap<String, int[]>();
        //production local ip
        CLASS_C_SAFE_IPs.put("192.168.31", MAX_RANGE);
        //neutec office external ip range
        CLASS_C_SAFE_IPs.put("211.72.224", MAX_RANGE);
        CLASS_C_SAFE_IPs.put("218.32.72", MAX_RANGE);
        CLASS_C_SAFE_IPs.put("123.51.183", MAX_RANGE);
        CLASS_C_SAFE_IPs.put("203.69.34", MAX_RANGE);
        //neurv office external ip range
        CLASS_C_SAFE_IPs.put("123.51.184", MAX_RANGE);
        CLASS_C_SAFE_IPs.put("211.22.51", MAX_RANGE);
        CLASS_C_SAFE_IPs.put("123.51.200", MAX_RANGE);
        //nogle office
        CLASS_C_SAFE_IPs.put("123.51.190", new int[]{194, 196});// 速博
        CLASS_C_SAFE_IPs.put("210.242.193", new int[]{226, 231});// 中華


        /**
         * OP office ip - PH
         * IPVG 203.99.238.160-191
         * Pacnet 61.14.177.96-127
         */
        CLASS_C_SAFE_IPs.put("203.99.238", new int[]{160, 191});
        CLASS_C_SAFE_IPs.put("61.14.177", new int[]{96, 127});
    }

    private static String[] ipHeaders = {"x-forwarded-ip", "true-client-ip", "X-Forwarded-For", "Incap-Client-IP"};

    private HostAddressUtils() {
        throw new AssertionError();
    }

    /**
     * 給外部呼叫, 動態的加入安全IP
     *
     * @param IP
     */
    public static void addSafeIP(String IP) {
        SAFE_IP_LIST.add(IP);
    }

    /**
     * 給外部呼叫, 動態的加入安全IP - Class C EX : 203.99.238, new int[] {160, 191}
     * 211.72.224, new int[] {0, 255}
     *
     * @param classC
     * @param range
     */
    public static void addSafeIP(String classC, int[] range) {
        CLASS_C_SAFE_IPs.put(classC, range);
    }


    public static void addSafeIP(String classC, String rangeString) {
        if ("*".equals(rangeString) || "-1".equals(rangeString)) {
            CLASS_C_SAFE_IPs.put(classC, MAX_RANGE);
            return;
        }

        String[] range = rangeString.split("-");
        if (range.length != 2) {
            return;
        }

        if ("0".equals(range[0].trim()) || "255".equals(range[1].trim())) {
            CLASS_C_SAFE_IPs.put(classC, MAX_RANGE);
            return;
        }

        CLASS_C_SAFE_IPs.put(classC, new int[]{Integer.parseInt(range[0].trim()), Integer.parseInt(range[1].trim())});
    }

    public static boolean isCDNetworks(HttpServletRequest request, boolean isCached) {
        String serverName = request.getServerName().toLowerCase();
        // for cache
        if (isCached) {
            if (serverName.startsWith("data.")) {
                return true;
            }
            return false;
        }
        if (request.getHeader("x-forwarded-ip") == null) {
            return false;
        }
        String via = request.getHeader("via");
        if (via == null || via.toLowerCase().indexOf("cdn") == -1) {
            return false;
        }
        return true;
    }

    public static boolean isAkamaiLine(HttpServletRequest request, boolean isCached) {
        String serverName = request.getServerName().toLowerCase();

        //----debug
		/*
		Enumeration<String> headerNames = request.getHeaderNames();
		while(headerNames.hasMoreElements()){
			String headerName = headerNames.nextElement();
			System.out.println("["+headerName+"]" + request.getHeader(headerName));
		}*/
        //----debug

        //for cache
        if (isCached) {
            if ((serverName.startsWith("info."))) {
                return true;
            }
            return false;
        }
        if (request.getHeader("true-client-ip") == null && request.getHeader("true_client_ip") == null) {
            return false;
        }

        return true;
    }

    public static boolean isIncapsulaLine(HttpServletRequest request, boolean isCached) {
        String serverName = request.getServerName().toLowerCase();
        // for cache
        if (isCached) {
            if ((serverName.startsWith("info."))) {
                return true;
            }
            return false;
        }
        if (request.getHeader("X-Forwarded-For") == null && request.getHeader("Incap-Client-IP") == null) {
            return false;
        }
        return true;
    }

    private static String getRealIPAddresses(HttpServletRequest httpRequest, String fwd1, String fwd2) {
        String ip = httpRequest.getRemoteAddr();
        if (ip.startsWith("209.200.") || ip.startsWith("69.172.221.") || ip.startsWith("69.172.222.") //
                || ip.startsWith("70.33.253.") || ip.startsWith("216.99.32.") || ip.startsWith("216.99.33.")) {
            if (fwd1 != null) {
                ip = fwd1;
            } else if (fwd2 != null) {
                ip = fwd2;
            }
        } else if (isCDNetworks(httpRequest, false)) {
            // CDNnetworks
            ip = httpRequest.getHeader("x-forwarded-ip");
        } else if (isAkamaiLine(httpRequest, false)) {
            // Akamai
            String fwd3 = httpRequest.getHeader("true-client-ip");
            String fwd4 = httpRequest.getHeader("true_client_ip");
            if (fwd3 != null) {
                ip = fwd3;
            } else if (fwd4 != null) {
                ip = fwd4;
            }
        } else if (isIncapsulaLine(httpRequest, false)) { //info 防御
            // Incapsula
            String fwd3 = httpRequest.getHeader("X-Forwarded-For");
            String fwd4 = httpRequest.getHeader("Incap-Client-IP");
            if (fwd3 != null) {
                ip = fwd3;
            } else if (fwd4 != null) {
                ip = fwd4;
            }
        }
        return ip;
    }

    private static String getActualIp(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        /* log.debug("getActualIp  request.getRemoteAddr()：" + ip);*/

        if (ip.startsWith("209.200.") || ip.startsWith("69.172.221.") || ip.startsWith("69.172.222.") || ip.startsWith("70.33.253.") || ip.startsWith("216.99.32.") || ip.startsWith("216.99.33.")) {
            String fwd1 = request.getHeader("HTTP_X-FORWARDED-FOR");
            String fwd2 = request.getHeader("X-FORWARDED-FOR");
            if (fwd1 != null) {
                ip = fwd1;
            } else if (fwd2 != null) {
                ip = fwd2;
            }
          /*  log.debug("fwd1 ：" + fwd1);
            log.debug("fwd2 ：" + fwd2);*/
        } else if (ip.startsWith("0:0:0:0:0:0:0:1")) {
            ip = "127.0.0.1";
        } else if (isIncapsulaLine(request, false)) {// Incapsula
            String fwd3 = request.getHeader("Incap-Client-IP");
            String fwd4 = request.getHeader("X-Forwarded-For");
            if (fwd3 != null) {
                ip = fwd3;
            } else if (fwd4 != null) {
                ip = fwd4;
            }
     /*       log.debug("fwd3 ：" + fwd3);
            log.debug("fwd4 ：" + fwd4);*/
        } else {
            String tempIp = null;
            //-- Get actual IP
            for (int i = 0; i < ipHeaders.length; i++) {
                /*log.debug("ipHeaders ：" + ipHeaders[i] + " - " + tempIp);*/
                tempIp = request.getHeader(ipHeaders[i]);
                if (tempIp != null && tempIp.trim().length() > 0) {
                    ip = tempIp;
                    //log.debug(String.format("Get ClientIP from header %1$s, ClientIP=%2$s", ipHeaders[i], ip));
                    //-- Get actual user IP
                    try {
                        if (ip.indexOf(",") != -1) {// 是否傳多個IP, 如 183.81.68.178,
                            // 27.118.26.94
                            ip = ip.split(",")[1];// 取第二個
                        }
                    } catch (Exception e) {
                        /*              log.error(e.getMessage(), e);*/
                    }
                    break;
                }
                /*log.debug(String.format("Directly output the request.getRemoteAddr()=%1s", ip));
				log.debug(String.format("HTTP_X-FORWARDED-FOR =", request.getHeader("HTTP_X-FORWARDED-FOR")));
				log.debug(String.format("X-FORWARDED-FOR =", request.getHeader("X-FORWARDED-FOR")));*/
				/*Enumeration<String> headerNames = request.getHeaderNames();
				log.debug("Output all header values=======================================================");
				String headerName = "";
				while(headerNames.hasMoreElements()){
					headerName = headerNames.nextElement();
					log.debug(String.format("headerName=%1s, value=%2s", headerName, request.getHeader(headerName)));
				}*/

            }
        }
        return ip;
    }

    public static String getRealIPAddresses(HttpServletRequest httpRequest) {
        return getActualIp(httpRequest);
    }

    /**
     * 取得本地端的IP
     *
     * @return
     */
    public static String getIPAddresses() {
        //Pattern ipPattern = Pattern.compile("\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}");
        try {
            Enumeration<NetworkInterface> localNetworkInterfaces = NetworkInterface.getNetworkInterfaces();
            Enumeration<InetAddress> allIPAddresses;
            while (localNetworkInterfaces.hasMoreElements()) {
                allIPAddresses = localNetworkInterfaces.nextElement().getInetAddresses();
                while (allIPAddresses.hasMoreElements()) {
                    String ip = allIPAddresses.nextElement().getHostAddress().toString();
                    if (ip.startsWith("192.168.31") // production
                            || ip.startsWith("10.10")// office
                    ) {
                        return ip;
                    }
                }
            }
        } catch (SocketException sockexc) {
            System.out.println("Socket Exception, Cannot Determine IP Addresses");
            sockexc.printStackTrace();
        }
        //for local test
        return "127.0.0.1";
    }

    /**
     * 允許存取API的IP
     *
     * @param ip
     * @return
     */
    public static boolean isApiSafeIP(String ip) {

        if (API_SAFE_IP_LIST.contains(ip)) {
            return true;
        }

        return false;
    }

    /**
     * 是否為安全的辦公室IP
     *
     * @param loginIP
     * @return
     */
    public static boolean isOfficeSafeIP(String loginIP) {
        int count = 0;
        int index = 0;
        int lastIndex = 0;
        while (index < loginIP.length() && (lastIndex = loginIP.indexOf(".", index)) >= 0) {
            count++;
            index = lastIndex + 1;
        }

        if (count != 3) {
            return true;
        }

        if (OFFICE_SAFE_IP_LIST.contains(loginIP)) {
            return true;
        }

        String beginningIP = loginIP.substring(0, index - 1);
        int[] range = CLASS_C_OFFICE_SAFE_IP_LIST.get(beginningIP);
        if (range != null && range.length == 2) {
            if (range == MAX_RANGE) {
                return true;
            }
            int lastNumber = Integer.parseInt(loginIP.substring(index));
            if (lastNumber >= range[0] && lastNumber <= range[1]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否為安全的IP
     *
     * @param loginIP
     * @return
     */
    public static boolean isSafeIP(String loginIP) {
        int count = 0;
        int index = 0;
        int lastIndex = 0;
        while (index < loginIP.length() && (lastIndex = loginIP.indexOf(".", index)) >= 0) {
            count++;
            index = lastIndex + 1;
        }

        if (count != 3) {
            return true;
        }

        if (SAFE_IP_LIST.contains(loginIP)) {
            return true;
        }

        // neutec office class B local ip
        if (loginIP.startsWith("10.10.")) {
            return true;
        }

        String beginningIP = loginIP.substring(0, index - 1);
        int[] range = CLASS_C_SAFE_IPs.get(beginningIP);
        if (range != null && range.length == 2) {
            if (range == MAX_RANGE) {
                return true;
            }
            int lastNumber = Integer.parseInt(loginIP.substring(index));
            if (lastNumber >= range[0] && lastNumber <= range[1]) {
                return true;
            }
        }
        return false;
    }

    /**
     * method name is not suitable anymore ,move the logic to websitetype
     * 不允許登入的國家 for Player
     *
     * @param country
     * @return
     */
    @Deprecated
    public static boolean isBannedCountry(String country) {
        // 2016.04.11 Han : 只先擋菲律賓
        //2016 07 05 jack : ban Cambodia
        if ("PH".equals(country) || "KH".equals(country)) {
            return true;
        }
        return false;
    }

    /**
     * 取得ip的最後一個數字
     *
     * @param ip
     * @return
     */
    public static int getLastIPNumber(String ip) {
        int index = ip.lastIndexOf(".");
        if (index == -1 || index == ip.length()) {
            throw new RuntimeException("Error IP : " + ip);
        }
        return Integer.parseInt(ip.substring(index + 1));
    }

    /**
     * 辨識ip的區域，目前尚未完全完成
     *
     * @param ip
     * @return 區域名稱
     */
    public static String getIpArea(String ip) {
        String area = "無法識別IP";
        if (ip.startsWith("192.168")) {
            area = "公司內部";
        } else if (ip.startsWith("127.0.0.1") || ip.startsWith("0:0:0:0:0:0:0:1")) {
            area = "本機測試";
        }
        return area;
    }
	/*
	public static String[] getSpecialPlayerList() {
		return larryList;
	}

	public static void resetSpecialPlayerList(String[] list) {
		larryList = list;
	}*/
}
