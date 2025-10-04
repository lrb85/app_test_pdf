window.examData_H12_811_V1_0_p_351_400 = {  
  "exam_code": "H12-811_V1.0_p_351_400",
  "exam_name": "HCIA-Datacom V1.0_parcial_351_400",
  "provider": "Huawei",
  "version": "v2025-07-17",
  "questions": [
    {
      "id": 351,
      "question_text": "The device running STP will discard the RSTP configuration BPDU when it receives it.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 352,
      "question_text": "In the STP protocol, which of the following factors will affect the election of the root switch? (Multiple choice)",
      "options": [
        "A. Switch priority",
        "B. Switch interface ID",
        "C. The IP address of the switch",
        "D. The interface bandwidth of the switch",
        "E. MAC address of the switch"
      ],
      "correct_answers": [
        "A",
        "E"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 353,
      "question_text": "What port status may exist in the switch with the standard STP protocol enabled? (Multiple choice)",
      "options": [
        "A. Discarding",
        "B. Forwarding",
        "C. Disabled",
        "D. Listening"
      ],
      "correct_answers": [
        "B",
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 354,
      "question_text": "Which of the following statement about the role of the STP protocol Forward Delay is correct?",
      "options": [
        "A. Improve the convergence speed of STP",
        "B. Improve the survival time of BPDUs to ensure that the configured BPDUs can be forwarded to more switches",
        "C. Prevent temporary loops",
        "D. Need to delay the transition between Blocking state and Disabled state",
        "E. Reduce the time interval for BPDU transmission"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 355,
      "question_text": "Using the ACL shown in the figure on the router RTA to match routing entries, which of the following entries will be matched?\n[RTA] acl 2002\n[RTA-acl-basic-2002] rule deny source 172.16.1.1 0.0.0.0\n[RTA-acl-basic-2002] rule deny source 172.16.0.0 0.255.0.0",
      "options": [
        "A. 172.18.0.0/16",
        "B. 172.16.1.0/24",
        "C. 192.17.0.0/24",
        "D. 172.16.1.1/24"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 356,
      "question_text": "As shown in the figure below, Router A has Telnetted Router B through the IP address 10.0.12.2. In the current interface, which of the following operations will cause the Telnet session of Router A and Router B to be interrupted? (Multiple choice)",
      "options": [
        "A. Enable OSPF protocol under G0/0/1 interface",
        "B. Configure static routing",
        "C. Modify the IP address of G0/0/1 interface",
        "D. Close G0/0/1 interface"
      ],
      "correct_answers": [
        "C",
        "D"
      ],
      "type": "multiple",
      "image": "placeholder_q356.png"
    },
    {
      "id": 357,
      "question_text": "Which of the following statements about the usage scenarios of the DHCP protocol is correct?",
      "options": [
        "A. After the DHCP request or response message continues to be received in the DHCP, the message format is directly forwarded without modifying the message format",
        "B. Multiple DHCP servers are not allowed in the network",
        "C. The DCHP client and DHCP server must be connected to the same switch",
        "D. If the DHCP client and the DHCP server are not in the same network segment, the DHCP message needs to be forwarded through the DHCP relay"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 358,
      "question_text": "Which parameter is used in the spanning tree protocol for root bridge election?",
      "options": [
        "A. Bridge priority",
        "B. Port ID",
        "C. Root path cost",
        "D. Bridge ID"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 359,
      "question_text": "What is the coverage area of an AP in WLAN?",
      "options": [
        "A. SSID",
        "B. BSSID",
        "C. BSS",
        "D. ESS"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 360,
      "question_text": "When using Telnet to log in to the router, which authentication methods can be selected? (Multiple choice)",
      "options": [
        "A. password authentication",
        "B. AAA local authentication",
        "C. Not authentication",
        "D. MD5 ciphertext authentication"
      ],
      "correct_answers": [
        "A",
        "B"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 361,
      "question_text": "What is the destination IP address of the DHCP DISCOVER message?",
      "options": [
        "A. 255.255.255.255",
        "B. 224.0.0.1",
        "C. 224.0.0.2",
        "D. 127.0.0.1"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 362,
      "question_text": "Which of the following does AAA not include?",
      "options": [
        "A. Authorization",
        "B. Accounting",
        "C. Authentication",
        "D. Audit"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 363,
      "question_text": "The following rules exist in a certain ACL of the router:\nrule deny tcp source 192.168.1.0 0.0.0.255 destination 172.16.10.1 0.0.0.0 destination-port eq 21\nWhich of the following statements is correct?",
      "options": [
        "A. The type of ACL is basic ACL",
        "B. The source IP is 192.168.1.1, the destination IP is 172.16.10.2, and all TCP packets whose destination port number is 21 match this rule",
        "C. The source IP is 192.168.1.1, the destination IP is 172.16.10.1, and all TCP packets whose destination port number is 21 match this rule",
        "D. The source IP is 192.168.1.1, the destination IP is 172.16.10.2, and all TCP packets whose destination port number is 21 match this rule"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 364,
      "question_text": "Which of the following message types is used by RADIUS to indicate authentication rejection?",
      "options": [
        "A. Access-Challenge",
        "B. Access-Accept",
        "C. Access-Request",
        "D. Access-Reject"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 365,
      "question_text": "Router Radius information configuration is as follows, which of the following statements are correct? (Multiple choice)\nradius-server template Huawei\nradius-server shared-key cipher Huawei\nradius-server authentication 200.0.12.1 1812\nradius-server accounting 200.0.12.1 1813\nradius-attribute nas-ip 200.0.12.2\n#",
      "options": [
        "A. The source IP address of the Radius packet sent by the router is 200.0.12.2",
        "B. The IP address of the authorization server is 200.0.12.1",
        "C. The IP address of the authentication server is 200.0.12.1",
        "D. The IP address of the accounting server is 200.0.12.1"
      ],
      "correct_answers": [
        "B",
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 366,
      "question_text": "With the topology shown in the figure and the configuration on the interconnection ports of the switch, it can be judged that the data frame tagged as VLAN10 can be forwarded normally between the two switches.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": "placeholder_q366.png"
    },
    {
      "id": 367,
      "question_text": "Which of the following port states does the RSTP protocol does not include?",
      "options": [
        "A. Learning",
        "B. Forwarding",
        "C. Blocking",
        "D. Discarding"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 368,
      "question_text": "How many port states exist in RSTP?",
      "options": [
        "A. 3",
        "B. 4",
        "C. 2",
        "D. 1"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 369,
      "question_text": "When the host frequently moves, which VLAN division method is most appropriate?",
      "options": [
        "A. Based on port division",
        "B. Based on IP subnet division",
        "C. Based on MAC address division",
        "D. Based on strategy division"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 370,
      "question_text": "The MAC address table of the existing switch is shown in the figure. Which of the following statements is correct?",
      "options": [
        "A. The MAC address 5489-9811-0b49 is manually configured by the administrator",
        "B. After the switch restarts, all MAC addresses need to be relearned",
        "C. The MAC address 5489-989d-1d30 is manually configured by the administrator",
        "D. The MAC address 5489-9885-18a8 is manually configured by the administrator"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": "placeholder_q370.png"
    },
    {
      "id": 371,
      "question_text": "Which of the following parameters does the switching network running STP protocol use in spanning tree calculations? (Multiple choice)",
      "options": [
        "A. Port ID",
        "B. Forward Delay",
        "C. Bridge ID",
        "D. Root path cost"
      ],
      "correct_answers": [
        "A",
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 372,
      "question_text": "VLAN4095 cannot be created on Huawei switches, and VLAN1 cannot be deleted.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 373,
      "question_text": "After the network administrator uses the TracertRoute function on the router device, in the data packet sent by the router, what is the value of the Protocol field in the IPv4 header?",
      "options": [
        "A. 6",
        "B. 2",
        "C. 1",
        "D. 17"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 374,
      "question_text": "On an interface that uses PPP as the data link layer protocol, you can configure a static route by specifying the next hop address or outgoing interface.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 375,
      "question_text": "Which of the following options does not belong to the SDN network architecture?",
      "options": [
        "A. Application collaboration layer",
        "B. Controller layer",
        "C. Device layer",
        "D. Chip layer"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 376,
      "question_text": "The Tracert diagnostic tool records the ______ of each ICMP TTL timeout message, so that it can provide the user with the IP address through which the message reaches the destination.",
      "options": [
        "A. Destination port",
        "B. Destination IP address",
        "C. Source port",
        "D. Source IP address"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 377,
      "question_text": "In the broadcast network as shown in the figure, OSPF runs on four routers, and they are in the same area and the same network segment. OSPF will automatically elect one DR and multiple BDRs to achieve better backup results.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "placeholder_q377.png"
    },
    {
      "id": 378,
      "question_text": "Now there are the following four network segments: 10.24.0.0/24, 10.24.1.0/24, 10.24.2.0/24, 10.24.3.0/24, which route can point to these four network segments at the same time?",
      "options": [
        "A. 10.24.1.0/23",
        "B. 0.0.0.0/0",
        "C. 10.24.0.0/22",
        "D. 10.24.0.0/21"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 379,
      "question_text": "What are the network types supported by the OSPF protocol? (Multiple choice)",
      "options": [
        "A. Point-to-Point",
        "B. Non-Broadcast Multi-Access",
        "C. Point-to-Multipoint",
        "D. Broadcast"
      ],
      "correct_answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 380,
      "question_text": "AC can manually specify the source address or source interface of the CAPWAP tunnel.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 381,
      "question_text": "Which of the following types of addresses cannot be used as the host's IPv4 address?",
      "options": [
        "A. Class C address",
        "B. Class A address",
        "C. Class B address",
        "D. Class D address"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 382,
      "question_text": "Only one SSID can be bound to one radio frequency of the AP.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 383,
      "question_text": "A company applies for a Class C IP address segment, but it must be allocated to 6 subsidiaries. The largest subsidiary has 26 computers. Different subsidiaries must be in different network segments, so what should the largest subsidiary's network the subnet mask be set to?",
      "options": [
        "A. 255.255.255.128",
        "B. 255.255.255.192",
        "C. 255.255.255.224",
        "D. 255.255.255.0"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 384,
      "question_text": "As shown in the figure below, which type of network device can host A and host B use to communicate?",
      "options": [
        "A. HUB",
        "B. Hub",
        "C. Layer 2 switch",
        "D. Router"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": "placeholder_q384.png"
    },
    {
      "id": 385,
      "question_text": "When planning the campus network, it is recommended that the server adopt a static IP address.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 386,
      "question_text": "Which of the following statement about the ARP message is wrong?",
      "options": [
        "A. ARP request message is sent by broadcast",
        "B. ARP packets cannot be forwarded to other broadcast domains",
        "C. ARP reply message is sent by unicast party",
        "D. Any link layer protocol needs ARP protocol assistance"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 387,
      "question_text": "When planning the campus network, which of the following mask lengths is recommended for device interconnection IP addresses?",
      "options": [
        "A. 30",
        "B. 32",
        "C. 16",
        "D. 24"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 388,
      "question_text": "Now it is necessary to implement a Python automation script Telnet to the device to view the running configuration of the device. Which of the following statement is wrong? (Multiple choice)",
      "options": [
        "A. You can use telnet.write (b'display current-configuration \\n') to input the command to view the current configuration of the device",
        "B. Use telnet.Telnet (host) to connect to the Telnet server",
        "C. telnet.close is used after each command is entered, and the function is that the user waits for the switch to return information",
        "D. Telnetlib can achieve this function"
      ],
      "correct_answers": [
        "B",
        "C"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 389,
      "question_text": "NFV (Network Functional Virtualization), network function virtualization, realizes the deployment of the network in a software-based way.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 390,
      "question_text": "Which of the following statements about IPv6 address configuration are correct? (Multiple choice)",
      "options": [
        "A. IPv6 supports stateless automatic configuration",
        "B. IPv6 addresses can only be configured manually",
        "C. IPv6 address supports automatic configuration in multiple ways",
        "D. IPv6 supports DHCPv6 for address configuration"
      ],
      "correct_answers": [
        "A",
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 391,
      "question_text": "When the host uses the stateless address automatic configuration scheme to obtain an IPv6 address, the DNS server cannot be obtained.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 392,
      "question_text": "SNMP packets are carried over TCP.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 393,
      "question_text": "Which of the following information prompts is used by the VRP operating platform for incomplete input commands?",
      "options": [
        "A. Error: Incomplete command found at ‘^’ position",
        "B. Error: Wrong parameter found at ‘^’ position",
        "C. Error: Ambiguous command found at ‘^’ position",
        "D. Error: Too many parameters found at ‘^’ position"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 394,
      "question_text": "If the network address of a network is 192.168.1.0, then its broadcast address must be 192.168.1.255.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 395,
      "question_text": "Which of the following working modes are supported by Huawei Enterprise AP? (Multiple choice)",
      "options": [
        "A. Local",
        "B. FIT",
        "C. FAT",
        "D. Cloud"
      ],
      "correct_answers": [
        "B",
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 396,
      "question_text": "Which of the following cannot be the length of the IPv4 packet header?",
      "options": [
        "A. 60B",
        "B. 20B",
        "C. 64B",
        "D. 32B"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 397,
      "question_text": "The authentication scheme, authorization scheme, accounting scheme, HYTACACS or RADIUS server template created on the AR router can only take effect after being applied under the domain.",
      "options": [
        "A. True",
        "B. False"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 398,
      "question_text": "In the network shown in the figure below, the host has an ARP cache. Which of the following statements is correct? (Multiple choice)",
      "options": [
        "A. The following entries may appear in the ARP cache of host A 10.0.12.2 MAC-C",
        "B. The router needs to be configured with a static route, otherwise host A and host B cannot communicate in both directions",
        "C. Host A and Host B can communicate in both directions",
        "D. The following entries exist in the ARP cache of host A 11.0.12.1 MAC-B"
      ],
      "correct_answers": [
        "A",
        "C"
      ],
      "type": "multiple",
      "image": "placeholder_q398.png"
    },
    {
      "id": 399,
      "question_text": "In Huawei equipment, which of the following methods can be used for OSPF to elect Router ID? (Multiple choice)",
      "options": [
        "A. If the Loopback interface is not configured, select the largest IP address among the IP addresses of other interfaces as the Router ID",
        "B. Huawei switches may use the IP address of the largest VLANIF as the Router ID",
        "C. If the Loopback interface is configured, select the largest IP address from the IP addresses of the Loopback interface as the Router ID",
        "D. Manually define an arbitrary legal Router ID",
        "E. Use the default 127.0.0.1"
      ],
      "correct_answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 400,
      "question_text": "The network administrator uses Ping to test the connectivity of the network. In this process, which of the following protocols may be used?",
      "options": [
        "A. UDP",
        "B. ICMP",
        "C. ARP",
        "D. TCP"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    }
  ]
}
