
window.examData_H12_811_V1_0_VOUCHER = {
  "exam_code": "H12_811_V1.0_VOUCHER",
  "exam_name": "HCIA-Datacom VOUCHER 60q",
  "provider": "Huawei",
  "version": "V1.0",
  "questions": [
    {
      "id": 1,
      "question_text": "NTP is a network protocol used to synchronize computer clocks with an NTP server. Which of the following statements about NTP is false?",
      "options": [
        "A. The stratum indicates the hierarchy for clock synchronization. The value 1 indicates the highest clock precision.",
        "B. The master time server directly synchronizes with the standard reference clock through cables or radio signals.",
        "C. NTP is a network layer protocol in the TCP/IP protocol suite.",
        "D. NTP packets are transmitted through UDP."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 2,
      "question_text": "An IPv6 address is 128 bits long. Typically, an IPv6 address is represented by eight groups of 16-bit hexadecimal values separated by colons (:). Which of the following statements about IPv6 addresses is false?",
      "options": [
        "A. The IPv6 address with the prefix FE80::/10 is a link-local address (LLA).",
        "B. ::/128 can be used as the source address of the request message sent by the client during the DHCPv6 initialization process.",
        "C. Each IPv6 interface must have a unique local address (ULA).",
        "D. Global unicast address (GUA) is globally unique."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 3,
      "question_text": "Which is the most widely used VLAN assignment method?",
      "options": [
        "A. Interface-based VLAN assignment",
        "B. Protocol-based VLAN assignment",
        "C. MAC address-based VLAN assignment",
        "D. IP subnet-based VLAN assignment"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 4,
      "question_text": "Which of the following are valid MAC address types? (Multiple Choice)",
      "options": [
        "A. Unicast MAC address",
        "B. Broadcast MAC address",
        "C. Multicast MAC address",
        "D. Anycast MAC address"
      ],
      "correct_answers": [
        "A",
        "B",
        "C"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 5,
      "question_text": "Which of the following is not a method for an AP to discover an AC address?",
      "options": [
        "A. OSPF",
        "B. DNS",
        "C. Static configuration",
        "D. DHCP"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 6,
      "question_text": "OSPF is configured on RTA, RTB, and RTC. GigabitEthernet 0/0/0 interfaces of these routers belong to area 0 and the network types of these interfaces are broadcast. The router ID of RTA is 1.1.1.1, and the DR priority of GigabitEthernet 0/0/0 on RTA is set to 0. The router ID of RTB is 2.2.2.2, and the DR priority of GigabitEthernet 0/0/0 on RTB is set to 255. The router ID of RTC is 3.3.3.3, and the DR priority of GigabitEthernet 0/0/0 on RTC is the default value. Which of the following statements is true about the DR and BDR on the network?",
      "options": [
        "A. RTA functions as the DR, and RTB as the BDR.",
        "B. RTB functions as the DR, and RTC as the BDR.",
        "C. RTC functions as the DR, and RTB as the BDR.",
        "D. RTB functions as the DR, and RTA as the BDR."
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 7,
      "question_text": "Which of the following statements about Fit AP+AC networking is true?",
      "options": [
        "A. The tunnel forwarding mode can reduce the forwarding pressure on the AC.",
        "B. After a CAPWAP tunnel is established between the AC and Fit AP, keepalive packets are used to detect the status of the CAPWAP tunnel.",
        "C. The AP version can be upgraded through HTTP.",
        "D. A control tunnel will definitely be established between AC and Fit AP."
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 8,
      "question_text": "The process for an AP to go online is as follows: The AP sends a Join Request packet to an AC, which then authenticates the AP after receiving the packet. The AP gets managed after being successfully authenticated. Which of the following AP authentication methods is not supported by an AC?",
      "options": [
        "A. MAC address authentication",
        "B. Password authentication",
        "C. Serial number authentication",
        "D. Non-authentication"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 9,
      "question_text": "Refer to the following AAA configuration on a device. Which of the following statements is true?\n[R1-aaa] display this\nauthentication-scheme default\nauthorization-scheme default\naccounting-scheme default\ndomain default\ndomain default_admin\nlocal-user huawei password cipher ...\nlocal-user huawei privilege level 0\nlocal-user huawei service-type telnet",
      "options": [
        "A. The huawei user can log in to the device through SSH.",
        "B. The authorization scheme is default and the authorization mode is non-authorization.",
        "C. The authentication mode is local authentication.",
        "D. The huawei user can run the display current-configuration command."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 10,
      "question_text": "In the TCP/IP reference model, network layer protocols are responsible for sending packets from the source host to the destination host. Which of the following protocols is not a network layer protocol?",
      "options": [
        "A. ICMP",
        "B. IGMP",
        "C. IPv4",
        "D. PPP"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 11,
      "question_text": "Which of the following statements about STP and RSTP is false?",
      "options": [
        "A. There are five STP port states: Forwarding, Learning, Listening, Blocking, and Disabled.",
        "B. RSTP converges faster than STP.",
        "C. RSTP is backward compatible with STP.",
        "D. There are three RSTP port states: Forwarding, Learning, and Blocking."
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 12,
      "question_text": "Network Address Translation (NAT) translates the IP address in an IP packet header into another IP address. Which of the following methods can implement NAT? (Multiple Choice)",
      "options": [
        "A. Static NAT/NAPT",
        "B. Easy IP",
        "C. Dynamic NAT",
        "D. NAT Server"
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
      "id": 13,
      "question_text": "OSPF completes the establishment of adjacency through four steps. Which of the following correctly describes the sequence of these steps?",
      "options": [
        "A. The devices exchange LSAs, negotiate the master/slave relationship, establish bidirectional neighbor relationships, update LSAs, and synchronize their LSDBs.",
        "B. The devices negotiate the master/slave relationship, establish bidirectional neighbor relationships, exchange LSAs, update LSAs, and synchronize their LSDBs.",
        "C. The devices negotiate the master/slave relationship, exchange LSAs, establish bidirectional neighbor relationships, update LSAs, and synchronize their LSDBs.",
        "D. The devices establish bidirectional neighbor relationships, negotiate the master/slave relationship, exchange LSAs, update LSAs, and synchronize their LSDBs."
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 14,
      "question_text": "Dynamic routing protocols can be classified into Interior Gateway Protocol (IGP) and Exterior Gateway Protocol (EGP). Which of the following protocols is an EGP?",
      "options": [
        "A. OSPF",
        "B. BGP",
        "C. IS-IS",
        "D. RIP"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 15,
      "question_text": "A host at 192.168.1.1/24 on an intranet wants to access a server at 160.131.20.1 on a public network. Refer to the following configuration on a gateway router:\n[RTA]interface GigabitEthernet 0/0/0\n[RTA-GigabitEthernet0/0/0]nat outbound 2000\nWhich of the following statements are true? (Multiple Choice)",
      "options": [
        "A. The address 192.168.1.1 will be translated into a public IP address in a public address pool.",
        "B. The administrator configures the NAT Server.",
        "C. The administrator configures Easy IP.",
        "D. The address 192.168.1.1 will be translated into the public network address of the interface GigabitEthernet 0/0/0 on the gateway router."
      ],
      "correct_answers": [
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 16,
      "question_text": "OSPF has multiple types of protocol packets. These packets play different roles in the interaction between OSPF routers. Which of the following packets describes summary information about the local LSDB and is used to synchronize the LSDBs of two routers?",
      "options": [
        "A. DD packet",
        "B. LSU packet",
        "C. Hello packet",
        "D. LSR packet"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 17,
      "question_text": "Which of the following lists the correct protocol layers of the TCP/IP reference model from bottom to top?",
      "options": [
        "A. Physical layer, data link layer, network layer, transport layer, and application layer",
        "B. Physical layer, data link layer, network layer, transport layer, session layer, presentation layer, and application layer",
        "C. Application layer, presentation layer, session layer, transport layer, network layer, data link layer, and physical layer",
        "D. Application layer, transport layer, network layer, data link layer, and physical layer"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 18,
      "question_text": "Which of the following are possible causes for an AP's failure to go online? (Multiple Choice)",
      "options": [
        "A. PoE parameters are incorrectly configured on the PoE switch to which the AP is connected.",
        "B. Network cables are not properly connected.",
        "C. The link between the AC and AP is not established.",
        "D. The AC version does not match the AP version."
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
      "id": 19,
      "question_text": "An AC manages and controls APs in a centralized manner through CAPWAP tunnels. An AP sends a Discovery Request packet to find an available AC. Which of the following methods cannot be used by an AP to discover an AC?",
      "options": [
        "A. DHCP",
        "B. Multicast",
        "C. DNS",
        "D. Static configuration (manually specifying an AC)"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 20,
      "question_text": "FTP is a file transfer protocol and works in active or passive mode.",
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
      "id": 21,
      "question_text": "Which of the following descriptions about collision domains and broadcast domains are correct? (Multiple Choice)",
      "options": [
        "A. All devices connected to the same hub belong to the same collision domain.",
        "B. The Ethernet uses CSMA/CD to avoid collisions in collision domains.",
        "C. Each port of a router connects to a broadcast domain.",
        "D. Each port of a switch connects to a collision domain."
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
      "id": 22,
      "question_text": "Which of the following statements about static and dynamic routes are true? (Multiple Choice)",
      "options": [
        "A. Dynamic routing protocols can automatically discover and generate routes and are more suitable for large-scale networks.",
        "B. Static routes have low requirements on the system and are applicable to simple, stable, and small-sized networks.",
        "C. Dynamic routing protocols can be classified into distance-vector routing protocols and link-state routing protocols based on their working mechanism and routing algorithms.",
        "D. When creating a static route, you must specify both the outbound interface and next hop."
      ],
      "correct_answers": [
        "A",
        "B",
        "C"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 23,
      "question_text": "In an OSPF AS, a router can function as both an ABR and an ASBR.",
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
      "id": 24,
      "question_text": "The Versatile Routing Platform (VRP) uses the file system to manage files and directories on a device. Which of the following commands can be used to check the current directory of a device?",
      "options": [
        "A. mkdir",
        "B. pwd",
        "C. display dir",
        "D. more"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 25,
      "question_text": "To prevent out-of-order packets, it is recommended that Eth-Trunk use flow-based load balancing.",
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
      "id": 26,
      "question_text": "Which of the following statements about Layer 2 hybrid ports are true? (Multiple Choice)",
      "options": [
        "A. When a tagged frame needs to be sent from a Layer 2 hybrid port of a switch and the VID in the tag of the frame is in the untagged VLAN ID list, the port removes the tag from the frame and then sends the untagged frame out on the link.",
        "B. After receiving a tagged frame on a link, a Layer 2 hybrid port checks whether the VID in the tag of the frame is in the tagged or untagged VLAN ID list. If not, the port discards the frame.",
        "C. When receiving an untagged frame on a link, a Layer 2 hybrid port adds a tag with the VID as its PVID to the frame.",
        "D. When a tagged frame needs to be sent from a Layer 2 hybrid port of a switch and the VID in the tag of the frame is in the tagged VLAN ID list, the port sends the frame out on the link without removing the tag from the frame."
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
      "id": 27,
      "question_text": "Frames transmitted on the trunk link between switches are all tagged.",
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
      "id": 28,
      "question_text": "Which of the following statements is false about Control and Provisioning of Wireless Access Points (CAPWAP)?",
      "options": [
        "A. CAPWAP is used to maintain the connectivity between APs and an AC.",
        "B. When tunnel forwarding is used, an AP exchanges data with an AC through a CAPWAP tunnel.",
        "C. CAPWAP is an application layer protocol based on TCP.",
        "D. The CAPWAP protocol supports the transmission of two types of messages at the transport layer: service data traffic and management traffic."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 29,
      "question_text": "Which of the following are advantages of switch stacking and clustering? (Multiple Choice)",
      "options": [
        "A. Simplifies network management.",
        "B. Simplifies network structure.",
        "C. Improves the performance of single switches.",
        "D. Improves network reliability."
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
      "id": 30,
      "question_text": "A router can advertise default routes in an OSPF area. Which of the following statements about OSPF default route advertisement are false? (Multiple Choice)",
      "options": [
        "A. The default-route-advertise command can be used to advertise a default route in an OSPF area only when the default route exists on the local device.",
        "B. The preference of the advertised default route in the routing table is 10.",
        "C. If there is no default route on the local device, the default-route-advertise always command can be run to advertise a default route in an OSPF area.",
        "D. After learning the default route through the OSPF protocol, an OSPF router will definitely add it to the routing table."
      ],
      "correct_answers": [
        "B",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 31,
      "question_text": "The Domain Name System (DNS) protocol is used to resolve domain names to IP addresses. Which of the following elements constitute a complete domain name? (Multiple Choice)",
      "options": [
        "A. Host name",
        "B. Top-level domain name",
        "C. Second-level domain name",
        "D. Root domain name"
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
      "id": 32,
      "question_text": "Network design and planning is the first phase of campus network construction.",
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
      "id": 33,
      "question_text": "Which of the following commands can be used to check OSPF LSDB information on a Huawei device?",
      "options": [
        "A. display ospf routing",
        "B. display ospf brief",
        "C. display ospf peer",
        "D. display ospf lsdb"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 34,
      "question_text": "Network Address Translation (NAT) translates the IP address in an IP packet header into another IP address. Which of the following is not an advantage of NAT?",
      "options": [
        "A. Alleviating the exhaustion of IP addresses",
        "B. Implementing accurate identification and control of packet flows on networks to control network access behavior, prevent network attacks, and improve network bandwidth efficiency",
        "C. Allowing the access of intranet hosts to external networks and the access of external hosts to intranets, and enabling communication between intranets and external networks",
        "D. Effectively preventing attacks from external networks and greatly improving network security"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 35,
      "question_text": "A hybrid port on a switch can connect to either a user host or a port on another switch.",
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
      "id": 36,
      "question_text": "When two static routes work as the primary and backup routes, the preference of the backup route can be changed to the same as that of the primary route so that the two routes become equal-cost routes.",
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
      "id": 37,
      "question_text": "In OSPF, which of the following network types require the election of a DR and BDR? (Multiple Choice)",
      "options": [
        "A. P2P",
        "B. BMA",
        "C. P2MP",
        "D. NBMA"
      ],
      "correct_answers": [
        "B",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 38,
      "question_text": "During IP packet forwarding, the last-hop router forwards packets using the direct route.",
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
      "id": 39,
      "question_text": "What is the length range of an Ethernet frame?",
      "options": [
        "A. 46 to 1518 bytes",
        "B. 64 to 1500 bytes",
        "C. 46 to 1500 bytes",
        "D. 64 to 1518 bytes"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 40,
      "question_text": "The Domain Name System (DNS) protocol is used to resolve domain names to IP addresses. Which of the following statements about DNS is false?",
      "options": [
        "A. The DNS protocol supports encapsulation using both UDP and TCP, with port number 53. Currently, Huawei devices only support DNS encapsulation using the TCP protocol.",
        "B. DNS supports recursive query.",
        "C. DNS server maintains the database that stores the mappings between domain names and IP addresses and responds to the requests from the resolver.",
        "D. Domain name can be used to identify a host."
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 41,
      "question_text": "Static routes and OSPF routes can form equal-cost routes.",
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
      "id": 42,
      "question_text": "As shown in the following networking, the interfaces connecting R1, R2, R3, and R4 are running OSPF, and are all in area 0. On R1, a static route to the network segment 10.1.34.0/24 is configured using the ip route-static 10.1.34.0 24 10.1.13.32 command. Which of the following statements is true?",
      "options": [
        "A. The routing table of R1 contains only the static route to the network segment 10.1.34.0/24.",
        "B. The routing table of R1 contains both the static route and OSPF route to the network segment 10.1.34.0/24.",
        "C. The routing table of R1 contains only the OSPF route to the network segment 10.1.34.0/24, and the next hop of the route is 10.1.13.32.",
        "D. The routing table of R1 contains the OSPF route to the network segment 10.1.34.0/24, and the next hop of the route is 10.1.12.21."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 43,
      "question_text": "A WLAN is constructed using wireless technologies. Which of the following statements about the WLAN networking is false?",
      "options": [
        "A. Basic service set (BSS) indicates an area covered by an AP.",
        "B. The basic service set identifier (BSSID) identifies a wireless network and is represented using the MAC address of an AP.",
        "C. Virtual access point (VAP) is a service entity virtualized on an AP. All VAPs virtualized on the same AP has the same BSSID.",
        "D. The service set identifier (SSID) identifies a wireless network and is represented using a character string."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 44,
      "question_text": "As shown in the following networking, the interfaces connecting R1, R2, R3, R4, and R5 are running OSPF, and are all in area 0. The routing table of R1 has two equal-cost routes to the destination 10.1.35.0/24. In order for the forwarding path R1 -> R4 -> R3 to be preferentially selected, which of the following configuration should be performed? (Multiple Choice)",
      "options": [
        "A. Run the ospf cost 10 command on GE0/0/3 of R3.",
        "B. Run the ospf cost 10 command on GE0/0/1 of R2.",
        "C. Run the ospf cost 10 command on GE0/0/3 of R2.",
        "D. Run the ospf cost 10 command on GE0/0/1 of R1."
      ],
      "correct_answers": [
        "C",
        "D"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 45,
      "question_text": "Which of the following statements are false about the forwarding behavior of access ports on a switch? (Multiple Choice)",
      "options": [
        "A. When an access port of the switch receives a data frame carrying the same tag as the default VLAN ID of the port, the port discards the frame.",
        "B. When an access port of the switch receives an untagged data frame, the port adds its default VLAN ID to the frame.",
        "C. When an access port of the switch sends an untagged data frame, the port adds its default VLAN ID to the frame.",
        "D. When an access port of the switch receives a data frame carrying the same tag as the default VLAN ID of the port, the port accepts the frame."
      ],
      "correct_answers": [
        "A",
        "C"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 46,
      "question_text": "The ping and tracert commands are used to check the network status. Which of the following statements about the ping and tracert commands is false?",
      "options": [
        "A. The ping command can be used to check connectivity to a destination address.",
        "B. The ping -s source-ip-address destination-ip-address command is used to specify the source and destination IP addresses of ICMP Echo Request packets.",
        "C. The source IP address of packets to be sent can be specified in the tracert command.",
        "D. The tracert command can be used to check the gateways that packets pass through before reaching the destination."
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 47,
      "question_text": "Various profiles are designed to facilitate the configuration and maintenance of WLAN functions and features. Which of the following statements about these profiles is false?",
      "options": [
        "A. Only security profiles and SSID profiles can be bound to VAP profiles.",
        "B. VAP profiles provide differentiated WLAN services for users.",
        "C. Radio profiles are used to optimize radio parameters and control the in-service channel switching function.",
        "D. Regulatory domain profiles provide configurations of the country code, calibration channel set, and calibration bandwidth for APs."
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 48,
      "question_text": "Refer to the following configuration on the VTY user interface 0. When a user logs in to the system through VTY 0, which of the following statements are true? (Multiple Choice)\n<HUAWEI> system-view\n[HUAWEI] user-interface vty 0\n[HUAWEI-ui-vty0] user privilege level 2",
      "options": [
        "A. The user can use the debugging command to diagnose service faults.",
        "B. The user can use the ping and tracert commands.",
        "C. The user can use some display commands.",
        "D. The user can use service configuration commands, including routing configuration commands."
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
      "id": 49,
      "question_text": "When a ping command is run on a network device to check the network connectivity, which type of packet will be sent by the network device?",
      "options": [
        "A. UDP",
        "B. ICMP",
        "C. TCP",
        "D. IGMP"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 50,
      "question_text": "Which of the following statements about IP addresses and MAC addresses are true? (Multiple Choice)",
      "options": [
        "A. IP addresses are unchangeable.",
        "B. The total length of the MAC address is 48 bits.",
        "C. The total length of the IP address is 32 bits.",
        "D. MAC addresses are unchangeable."
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
      "id": 51,
      "question_text": "Which of the following descriptions about collision domains and broadcast domains are correct? (Multiple Choice)",
      "options": [
        "A. All devices connected to the same hub belong to the same collision domain.",
        "B. The Ethernet uses CSMA/CD to avoid collisions in collision domains.",
        "C. Each port of a router connects to a broadcast domain.",
        "D. Each port of a switch connects to a collision domain."
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
      "id": 52,
      "question_text": "The route preference is an indicator used by a router to compare routes of different routing protocols. Which of the following statements are true about the default preference of common routes? (Multiple Choice)",
      "options": [
        "A. The default preference of an OSPF external route is 255.",
        "B. The default preference of a static route is 60.",
        "C. The default preference of an OSPF internal route is 10.",
        "D. The default preference of a direct route is 0."
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
      "id": 53,
      "question_text": "The concept of Network Functions Virtualization (NFV) was proposed by a group of network service providers to solve problems such as too much telecom network hardware, complex deployment and O&M, and difficult service innovation. Which of the following components are included in the standard NFV architecture? (Multiple Choice)",
      "options": [
        "A. NFVI",
        "B. VNF",
        "C. OS",
        "D. MANO"
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
      "id": 54,
      "question_text": "If multiple routes are to be aggregated into a single route, these route entries must have the same next-hop address.",
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
      "id": 55,
      "question_text": "Which of the following parameters can be specified when an administrator configures an advanced ACL? (Multiple Choice)",
      "options": [
        "A. Source and destination port numbers",
        "B. ICMP protocol type",
        "C. Source and destination IP addresses",
        "D. Source and destination MAC addresses"
      ],
      "correct_answers": [
        "A",
        "B",
        "C"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 56,
      "question_text": "Which of the following statements is true about APs in WLAN networking?",
      "options": [
        "A. Typically, APs use PoE power to facilitate deployment.",
        "B. Fat APs need to work with an AC and are managed and configured by the AC in a unified manner.",
        "C. An AC must be deployed in WLAN networks.",
        "D. Fit APs can independently implement functions such as wireless user access, service data encryption, and service data packet forwarding."
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 57,
      "question_text": "Refer to the following configuration on a Huawei router.\n<huawei>system-view\n[huawei]user-interface maximum-vty 7\nWhich of the following statements is true?",
      "options": [
        "A. The router allows a maximum of seven users to log in concurrently through Telnet.",
        "B. The device allows a maximum of 7 historical commands to be saved.",
        "C. The router allows a maximum of seven users to log in concurrently through the console port.",
        "D. If a user forgets the system login password, the user will be locked out after seven consecutive failed login attempts."
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 58,
      "question_text": "Which of the following statements about OSPF areas are true? (Multiple Choice)",
      "options": [
        "A. The OSPF multi-area design can reduce the LSA flooding scope.",
        "B. OSPF multi-area improves network scalability and facilitates the construction of large-scale networks.",
        "C. Route summarization can be performed at the border of two OSPF areas to reduce the size of the routing table.",
        "D. OSPF areas can be classified into backbone areas and non-backbone areas."
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
      "id": 59,
      "question_text": "The following shows the routing table of a specific router:\nDestination/Mask Proto Pre Cost Flags NextHop Interface\n172.16.1.0/24 OSPF 10 200 D 192.168.1.2 GigabitEthernet0/0/0\n172.16.0.0/16 Static 5 0 RD 192.168.1.2 GigabitEthernet0/0/0\n172.16.1.0/22 Static 80 0 RD 192.168.1.2 GigabitEthernet0/0/0\nWhen data needs to be sent to the destination 172.16.1.1 through this router, which of the following routes is used?",
      "options": [
        "A. Static route 172.16.0.0/16 with a preference of 5 and cost of 0",
        "B. Both static routes because their cost values are the same",
        "C. OSPF route 172.16.1.0/24 with a preference of 10 and cost of 200",
        "D. Static route 172.16.1.0/22 with a preference of 80 and cost of 0"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 60,
      "question_text": "In contrast with SNMPv1, which of the following operations are newly added to SNMPv2c? (Multiple Choice)",
      "options": [
        "A. GetNextRequest",
        "B. GetBulkRequest",
        "C. InformRequest",
        "D. SetRequest"
      ],
      "correct_answers": [
        "B",
        "C"
      ],
      "type": "multiple",
      "image": null
    }
  ]
}
