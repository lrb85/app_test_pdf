window.examData_H12_811_V1_0_p_251_300 = { 
  "exam_code": "H12-811_V1.0_p_251_300",
  "exam_name": "HCIA-Datacom V1.0_parcial_251_300",
  "provider": "Huawei",
  "version": "v2025-07-17",
  "questions": [
    {
      "id": 251,
      "question_text": "As shown in the figure, with regard to OSPF topology and configuration, which of the following statements is correct?",
      "options": [
        "A. R1 and R2 can establish a stable OSPF neighbor relationship",
        "B. Compared with R2, R1 has a better chance of becoming a DR because its interface DR priority value is smaller",
        "C. As long as the interface network type of R1 is restored to the default broadcast type, R1 and R2 can establish a stable neighbor relationship",
        "D. As long as the interface network type of R1 is restored to the default broadcast type, and the hello time is adjusted to 10s, R1 and R2 can establish a stable neighbor relationship"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": "placeholder_q251.png"
    },
    {
      "id": 252,
      "question_text": "The output information of the router R1 routing table is shown in the figure. Which of the following statements is correct? (Multiple choice)",
      "options": [
        "A. The data packet whose destination network is 12.0.0.0/8 will be forwarded from the router's Ethernet0/0/0 interface",
        "B. The router will discard packets whose destination network is 11.0.0.0/8",
        "C. The router will forward data packets whose destination network is 12.0.0.0/8",
        "D. The data packet whose destination network is 11.0.0.0/8 will be forwarded from the router's GigabitEthernet0/0/0 interface"
      ],
      "correct_answers": [
        "C",
        "D"
      ],
      "type": "multiple",
      "image": "placeholder_q252.png"
    },
    {
      "id": 253,
      "question_text": "The subnet mask of a network segment 150.25.0.0 is 255.255.224.0, then which is a valid host address in this network segment? (Multiple choice)",
      "options": [
        "A. 150.15.3.30",
        "B. 150.25.0.0",
        "C. 150.25.2.24",
        "D. 150.25.1.255"
      ],
      "correct_answers": [
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 254,
      "question_text": "Which of the following characteristics does the OSPF protocol have? (Multiple choice)",
      "options": [
        "A. Division of support areas",
        "B. Prone to routing loops",
        "C. Calculate the shortest path based on the number of hops",
        "D. Trigger an update"
      ],
      "correct_answers": [
        "A",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 255,
      "question_text": "On Huawei routers, by default, the priority value of the static routing protocol is?",
      "options": [
        "A. 120",
        "B. 100",
        "C. 0",
        "D. 60"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 256,
      "question_text": "Which of the following descriptions of OSPF DD packets and LSAs are correct? (Multiple choice)",
      "options": [
        "A. DD packet contains detailed information about LSA",
        "B. The LSA header is only a small part of the LSA",
        "C. The header of the LSA can uniquely identify an LSA",
        "D. DD packets only contain LSA header information"
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
      "id": 257,
      "question_text": "Which of the following IPv4 addresses are Class A addresses? (Multiple choice)",
      "options": [
        "A. 100.1.1.1",
        "B. 172.16.1.1",
        "C. 192.168.1.1",
        "D. 127.0.0.1"
      ],
      "correct_answers": [
        "A",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 258,
      "question_text": "Which of the following descriptions of OSPF Router ID is wrong? (Multiple choice)",
      "options": [
        "A. The prerequisite for the normal operation of the OSPF protocol is that the router has a Router ID",
        "B. Router ID in the same area must be the same, and Router ID in different areas can be different",
        "C. Router ID must be the IP address of an interface on the router",
        "D. The Router ID must be specified by manual configuration"
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
      "id": 259,
      "question_text": "The statement about the TTL field in the IPv4 header, which is correct? (Multiple choice)",
      "options": [
        "A. TTL value length is 80bit",
        "B. Every time a packet passes through a layer 3 device, the TTL value is reduced by 1",
        "C. When routing loops occur, the TTL value can be used to prevent data packets from being forwarded indefinitely",
        "D. The range of TTL value is 0-255"
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
      "id": 260,
      "question_text": "In what state does the OSPF protocol confirm the master-slave relationship of the DD message?",
      "options": [
        "A. 2-way",
        "B. Exchange",
        "C. Full",
        "D. ExStart"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 261,
      "question_text": "As shown in the figure, two switches use the default parameters to run STP root primary, and switch B uses the configuration command STP priority 0, which port will be blocked?",
      "options": [
        "A. G0/0/3 of HUB",
        "B. G0/0/2 of switch A",
        "C. G0/0/1 of switch A",
        "D. G0/0/1 of switch B"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "placeholder_q261.png"
    },
    {
      "id": 262,
      "question_text": "As shown in the figure, after the two routers are configured with OSPF, the administrator configures the <silent-interface s0/0/0> command on RTA, then which of the following descriptions is correct? (Multiple choice)",
      "options": [
        "A. RTA will continue to receive and analyze and process OSPF packets sent by RTB",
        "B. The neighbor relationship between the two routers will be down",
        "C. The neighbor relationship between the two routers will not be affected",
        "D. RTA will no longer send OSPF packets"
      ],
      "correct_answers": [
        "B",
        "D"
      ],
      "type": "multiple",
      "image": "placeholder_q262.png"
    },
    {
      "id": 263,
      "question_text": "If the Length/Type of an Ethernet data frame = 0x8100, then the payload of this data frame cannot be? (Multiple choice)",
      "options": [
        "A. RSTP data frame",
        "B. ARP reply packet",
        "C. OSPF packet",
        "D. STP data frame"
      ],
      "correct_answers": [
        "A",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 264,
      "question_text": "Which layer of the OSI reference model does the Ethernet switch work?",
      "options": [
        "A. Data link layer",
        "B. Transport layer",
        "C. Physical layer",
        "D. Network layer"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 265,
      "question_text": "By default, the root path cost of the root bridge in the STP protocol must be.",
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
      "id": 266,
      "question_text": "As shown in the figure below, all hosts can communicate normally, then the corresponding relationship between SWA MAC address and port, which is correct?",
      "options": [
        "A. MAC-A G0/0/1, MAC-B G0/0/2, MAC-C G0/0/1",
        "B. MAC-A G0/0/2, MAC-B G0/0/2, MAC-C G0/0/3",
        "C. MAC-A G0/0/1, MAC-B G0/0/1, MAC-C G0/0/3",
        "D. MAC-A G0/0/1, MAC-B G0/0/2, MAC-C G0/0/3"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": "placeholder_q266.png"
    },
    {
      "id": 267,
      "question_text": "Which of the following statements about link aggregation in LACP mode is correct?",
      "options": [
        "A. There can only be 4 active ports in LACP mode",
        "B. The number of active ports cannot be set in LACP mode",
        "C. All active interfaces in LACP mode participate in data forwarding and share load traffic",
        "D. In LACP mode, devices at both ends of the link send LACP packets to each other"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 268,
      "question_text": "The configuration information of a certain port of the switch is shown in the figure. Which of the following statements is wrong?\n#\ninterface GigabitEthernet0/0/2\nport hybrid pvid vlan 100\nport hybrid tagged vlan 100\nport hybrid untagged vlan 200\n#",
      "options": [
        "A. The port type is Hybrid",
        "B. If the VLAN TAG carried in the data frame is 200, the switch will strip off the VLAN TAG and send it out",
        "C. If the port receives data frames without VLAN TAG, the switch needs to add VLAN TAG 100",
        "D. If the VLAN TAG carried in the data frame is 100, the switch will strip off the VLAN TAG and send it out"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 269,
      "question_text": "By default, what is the STP Forward Delay time in seconds?",
      "options": [
        "A. 15",
        "B. 10",
        "C. 20",
        "D. 5"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 270,
      "question_text": "OSPF protocol is based on which of the following protocols?",
      "options": [
        "A. IP",
        "B. HTTP",
        "C. UDP",
        "D. TCP"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 271,
      "question_text": "In order to ensure that the same data stream is forwarded on the same physical link, which method of load sharing does Eth-Trunk adopt?",
      "options": [
        "A. Flow-based load sharing",
        "B. Packet-based load sharing",
        "C. Load sharing based on application layer information",
        "D. Load sharing based on the inbound interface of the packet"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 272,
      "question_text": "The MAC address table of a certain switch is shown in the figure. If the switch receives a data frame with a destination MAC of 5489-9811-0b49 from port Eth0/0/2, which of the following statements is correct?",
      "options": [
        "A. Forward this data frame from the Eth0/0/2 port",
        "B. Discard this data frame",
        "C. Forward this data frame from port Eth0/0/3",
        "D. Flood out this data frame"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": "placeholder_q272.png"
    },
    {
      "id": 273,
      "question_text": "The value of the Type field in the RSTP configuration BPDU message is?",
      "options": [
        "A. 0x03",
        "B. 0x01",
        "C. 0x00",
        "D. 0x02"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 274,
      "question_text": "In which view can the administrator modify the device name for the router?",
      "options": [
        "A. Protocol-view",
        "B. User-view",
        "C. System-view",
        "D. Interface-view"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 275,
      "question_text": "It is known that there are two entries in the routing table of a certain router. If the router wants to forward packets with the destination address of 9.1.4.5, which of the following statements is correct?\nDestination/Mask Protocol Pre Cost Nexthop Interface\n9.0.0.0/8 OSPF 10 50 1.1.1.1 Serial0\n9.1.0.0/16 IS-IS 15 100 2.2.2.2 Ethernet0",
      "options": [
        "A. Choose the second item as the best matching item, because Ethernet0 is faster than Serial0",
        "B. Choose the second item as the best matching item, because the cost of the RIP protocol is small",
        "C. Choose the first item as the best matching item, because the OSPF protocol has a higher priority value",
        "D. Select the second item as the best matching item, because the route is a more accurate match compared to the destination address 9.1.4.5"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 276,
      "question_text": "The network shown in the figure below requires the network where host A is located to access the Internet through Easy IP. Which of the following ACLs should be used on the G0/0/3 interface of router A?",
      "options": [
        "A. acl number 2000; rule 5 permit source 10.0.12.0.0.0.0.255; #",
        "B. acl number 2000; rule 5 permit source 10.0.13.0.0.0.0.255; #",
        "C. acl number 2000; rule 5 permit source 10.0.12.1.0.0.0.0; #",
        "D. acl number 2000; rule 5 permit source 10.0.13.1.0.0.0.0; #"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "placeholder_q276.png"
    },
    {
      "id": 277,
      "question_text": "NAPT distinguishes the IP addresses of different users through the protocol numbers in TCP or UDP or IP packets.",
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
      "id": 278,
      "question_text": "The 'maximum-vty' command of the VTY user interface can configure how many users can log in to the device through Telnet at the same time.",
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
      "id": 279,
      "question_text": "Which command can configure the country code on the AC?",
      "options": [
        "A. nation-code",
        "B. province-code",
        "C. country-code",
        "D. state-code"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 280,
      "question_text": "AP's working mode does not allow switching.",
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
      "id": 281,
      "question_text": "Which of the following IEEE 802.11 standards support working in the 2.4GHz and 5GHz frequency bands? (Multiple choice)",
      "options": [
        "A. 802.11g",
        "B. 802.11n",
        "C. 802.11ax",
        "D. 802.11ac"
      ],
      "correct_answers": [
        "B",
        "C"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 282,
      "question_text": "Which of the following parameters is used in LCP negotiation to detect link loops and other abnormal conditions?",
      "options": [
        "A. CHAP",
        "B. MRU",
        "C. Magic word",
        "D. PAP"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 283,
      "question_text": "The tree network topology is actually a hierarchical star structure, which is easy to expand the network scale, but the higher the level, the more serious the network problem caused by the node failure.",
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
      "id": 284,
      "question_text": "When setting up a campus network, which of the following protocols can be used to avoid Layer 2 loops?",
      "options": [
        "A. SNMP",
        "B. NAT",
        "C. OSPF",
        "D. RSTP"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 285,
      "question_text": "The DHCPv6 server supports providing the host with other configuration information such as DNS server addresses.",
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
      "id": 286,
      "question_text": "What extension headers does the IPv6 message support? (Multiple choice)",
      "options": [
        "A. Fragmentation extension header",
        "B. Destination Option Extension Header",
        "C. VLAN extension header",
        "D. Hop-by-hop option extension header"
      ],
      "correct_answers": [
        "A",
        "B",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 287,
      "question_text": "The IPv6 protocol uses NS and NA packets for duplicate address detection (DAD).",
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
      "id": 288,
      "question_text": "NFV (Network Functional Virtualization), network function virtualization, realizes the deployment of network applications in a software-based way.",
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
      "id": 289,
      "question_text": "Which of the following methods can read data non-blocking in Python's telnetlib?",
      "options": [
        "A. telnet.read_very_lazy()",
        "B. telnet.read_all()",
        "C. telnet.read_eager()",
        "D. telnet.read_very_eager()"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 290,
      "question_text": "UDP is oriented to connectionless, what protocol must be relied on to ensure the reliability of transmission?",
      "options": [
        "A. Transmission Control Protocol",
        "B. Application layer protocol",
        "C. Network layer protocol",
        "D. Internet Protocol"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 291,
      "question_text": "What is the full name of the general routing platform VRP?",
      "options": [
        "A. Versatile Redundancy Platform",
        "B. Versatile Routing Protocol",
        "C. Virtual Routing Platform",
        "D. Versatile Routing Platform"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 292,
      "question_text": "Which of the following levels does not belong to the common network level in the medium-sized campus network architecture?",
      "options": [
        "A. Network layer",
        "B. Core layer",
        "C. Convergence layer",
        "D. Access layer"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 293,
      "question_text": "The statement about the function of the network layer in the OSI reference model, which is correct?",
      "options": [
        "A. To transmit bit streams between devices, the level, speed, and cable pins are specified",
        "B. The layer closest to the user in the OSI reference model provides network services for applications",
        "C. Provide connection-oriented or non-connection-oriented data transmission and error detection before retransmission",
        "D. Combine bits into bytes, then combine bytes into frames, use link layer addresses (Ethernet uses MAC addresses) to access the medium, and perform error detection",
        "E. Provide logical address to realize data forwarding from source to destination"
      ],
      "correct_answers": [
        "E"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 294,
      "question_text": "Regarding the role of the ARP protocol and message encapsulation, which description is correct?",
      "options": [
        "A. ARP protocol supports deployment on PPP link and HDLC link",
        "B. ARP protocol is based on Ethernet encapsulation",
        "C. The MAC address and UUID address of the destination can be obtained through the ARP protocol",
        "D. The ARP cache on the network device can only be obtained through the ARP protocol"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 295,
      "question_text": "In the OSPF broadcast network, which routers will a D Rother router exchange link state information with? (Multiple choice)",
      "options": [
        "A. BDR",
        "B. All OSPF neighbors",
        "C. DR Other",
        "D. DR"
      ],
      "correct_answers": [
        "A",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 296,
      "question_text": "The broadcast address of the 192.168.1.0/25 network segment is 192.168.1.128.",
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
      "id": 297,
      "question_text": "Which fields in the IPv4 header are related to fragmentation? (Multiple choice)",
      "options": [
        "A. Flags",
        "B. TTL",
        "C. Identification",
        "D. Fragment Offset"
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
      "id": 298,
      "question_text": "The last option field of IPv4 is variable-length optional information. What is the maximum length of this field?",
      "options": [
        "A. 10B",
        "B. 40B",
        "C. 60B",
        "D. 20B"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 299,
      "question_text": "Which of the following statements about the default route are correct? (Multiple choice)",
      "options": [
        "A. If the destination address of the message cannot match any other routing entries in the routing table, the router will forward the message according to the default route.",
        "B. In the routing table, the default route appears as a route to the network 0.0.0.0 (the mask is also 0.0.0.0).",
        "C. There must be a default route in the routing table of any router.",
        "D. The default route can only be manually configured by the administrator."
      ],
      "correct_answers": [
        "A",
        "B"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 300,
      "question_text": "Which of the following is not included in the routing table?",
      "options": [
        "A. MAC",
        "B. NextHop",
        "C. Cost",
        "D. Destination/Mask"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    }
  ]
}
