window.examData_H12_811_V1_0_p_851_900 = {  
  "exam_code": "H12-811_V1.0_p_851_900",
  "exam_name": "HCIA-Datacom V1.0_parcial_851_900",
  "provider": "Huawei",
  "version": "v2025-07-17",
  "questions": [
    {
      "id": 212,
      "question_text": "The Priority field in the VLAN tag can identify the priority of the data frame. What is the range of this priority?",
      "options": [
        "A. 0-7",
        "B. 0-15",
        "C. 0-3",
        "D. 0-63"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 213,
      "question_text": "If during the PPP authentication process, the authenticated person sends a wrong user name and password to the authenticator, what type of message will the authenticator send to the authenticated person?",
      "options": [
        "A. Authenticate-Reply",
        "B. Authenticate-Ack",
        "C. Authenticate-Nak",
        "D. Authenticate-Reject"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 214,
      "question_text": "The administrator finds that the two routers stay in the 2-way state when establishing OSPF neighbor relations. Which of the following description is correct?",
      "options": [
        "A. These two routers are DR Other routers in the broadcast network",
        "B. The router is configured with a wrong Router ID",
        "C. The router is configured with the same process",
        "D. The routers are configured with the same area ID"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 215,
      "question_text": "What is the function of the command port trunk allowpass vlan all?",
      "options": [
        "A. If the port default vlan3 command is configured for the connected remote device, the VLAN3 between the two devices cannot communicate.",
        "B. The peer port connected to this port must be configured with port trunk permit vlan all at the same time",
        "C. The connected peer device can dynamically determine which VLAN IDs are allowed to pass through",
        "D. The port allows data frames of all VLANs to pass through"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 216,
      "question_text": "Which of the following information does the MAC address table of the switch contain?",
      "options": [
        "A. IP address",
        "B. Port number",
        "C. VLAN",
        "D. MAC address"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 217,
      "question_text": "The network administrator finds that a certain port of the switch has learned the MAC address, but cannot forward data frames. Which of the following working states is this port in?",
      "options": [
        "A. Listening",
        "B. Disabled",
        "C. Learning",
        "D. Blocking"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 218,
      "question_text": "As shown in the figure, two hosts communicate between VLANs through single-arm routing. When the G0/0/1.2 sub-interface of RTA receives the data frame sent by host B to host A, which of the following operations will RTA perform?",
      "options": [
        "A. RTA forwards the data directly through the G0/0/1.1 sub-interface",
        "B. After RIA deletes VLAN tag 20, it is sent out by G0/0/1.1 interface",
        "C. RTA will discard the data frame",
        "D. RTA first deletes the VLAN tag 20, then adds the VLAN tag 10, and then sends it out through the G0/0/1.1 interface"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": "placeholder_q559.png"
    },
    {
      "id": 219,
      "question_text": "The configuration information of a certain port of the switch is shown in the figure, so when this port sends data frames carrying which VLANs, the VLAN TAG is stripped?\n#\ninterface GigabitEthernet0/0/1\nport hybrid tagged vlan 2 to 3 100\nport hybrid untagged vlan 4 6\n#",
      "options": [
        "A. 4,5,6",
        "B. 1,4,5,6",
        "C. 4,6",
        "D. 1,4,6"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 220,
      "question_text": "For the network shown in the figure below, which of the following statements is correct?\nRouter A\ninterface GigabitEthernet0/0/0.100\ndot1q termination vid 200\nip address 10.0.12.1 255.255.255.0\narp broadcast enable\n#\nRouter B\ninterface GigabitEthernet0/0/0.200\ndot1q termination vid 200\nip address 10.0.12.2 255.255.255.0\narp broadcast enable\n#",
      "options": [
        "A. The sub-interface of Router B cannot learn the MAC address of the sub-interface of Router A.",
        "B. The sub-interface of Router A cannot learn the MAC address of the sub-interface of Router B.",
        "C. Because the sub-interface numbers of Router A and Router B are inconsistent, Router A and Router B cannot communicate",
        "D. 10.0.12.1 can ping 10.0.12.2"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": "placeholder_q561.png"
    },
    {
      "id": 221,
      "question_text": "Two authentication domains 'Area 1' and 'Area2' are configured on a router acting as an authentication server. If a user authenticates with the correct user name 'huawei' and password 'hello', the user will be assigned to which authentication domain?",
      "options": [
        "A. Authentication domain 'default_admin domain'",
        "B. Authentication domain 'default domain'",
        "C. Authentication domain 'Area1'",
        "D. Authentication domain 'Area2'"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 222,
      "question_text": "Which of the following IPv6 addresses is a multicast address?",
      "options": [
        "A. FE80::2E0:FCFF:FEEF:FEC",
        "B. 2000::2E0:FCFF:FEEF:FEC",
        "C. FC00::2E0:FCFF:FEEF:FEC",
        "D. FF02::2E0:FCFF:FEEF:FEC"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 223,
      "question_text": "In the network shown in the figure below, when the OSPF neighbor status is stable, what is the neighbor status of Router A and Router B?",
      "options": [
        "A. Full",
        "B. Attempt",
        "C. 2-way",
        "D. Down"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": "placeholder_q564.png"
    },
    {
      "id": 224,
      "question_text": "Which field in the IPv6 packet header can be used for QoS?",
      "options": [
        "A. Payload Length",
        "B. Traffic Class",
        "C. Version",
        "D. Next Header"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 225,
      "question_text": "Which of the following is not a characteristic of a small campus network?",
      "options": [
        "A. Simple network hierarchy",
        "B. Wide coverage",
        "C. The number of users is small",
        "D. Simple network requirements"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 226,
      "question_text": "Which of the following statements about the generation protocol root bridge election is correct?",
      "options": [
        "A. The device with the highest bridge priority becomes the root bridge",
        "B. When the bridge priorities are the same, the device with more ports becomes the root bridge",
        "C. When the bridge priorities are the same, the device with the larger MAC address becomes the root bridge",
        "D. The device with the lowest bridge priority value becomes the root bridge"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 227,
      "question_text": "Which of the following authentication methods does not require entering a user name and password?",
      "options": [
        "A. authentication-mode none",
        "B. authentication-mode local",
        "C. authentication-mode hwtacacs",
        "D. authorization-mode hwtacacs"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 228,
      "question_text": "Which of the following IEEE 802.11 standards does not support communication in the 5GHz frequency band?",
      "options": [
        "A. 802.11n",
        "B. 802.11g",
        "C. 802.11ac wave 1",
        "D. 802.11ac wave2"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 229,
      "question_text": "Which of the following IEEE802.11 standards only supports communication in the 2.4GHz frequency band?",
      "options": [
        "A. 802.11n",
        "B. 802.11g",
        "C. 802.11ax",
        "D. 802.11a"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 230,
      "question_text": "Regarding the display startup information of the AR2200 router, which statement is wrong about this information?\n<Huawei>display startup\nMainboard:\nStartup system software: sd1:/ar2220-v200r003c00spc200.cc\nNext startup system software: sd1:/ar2220-v200r003c00spc200.cc\nBackup system software for next startup: null\nStartup saved-configuration file: null\nNext startup saved-configuration file: null\nStartup license file: null\nNext startup license file: null\nStartup patch package: null\nNext startup patch package: null\nStartup voice-files: null\nNext startup voice-files: null",
      "options": [
        "A. The system files for the next startup of the device can be modified using the command 'startup system software'",
        "B. The running configuration file is not saved",
        "C. The system file used by the device to start this time is ar2220-v200r003c00spc00.cc",
        "D. The system files cannot be modified when the device starts next time"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 231,
      "question_text": "The dynamic IP address assigned by the DHCP server to the client. Usually there is a certain lease period, which of the following description about the lease period is wrong?",
      "options": [
        "A. The lease renewal timer is 50% of the total lease period. When the 'lease renewal timer' expires, the DHCP client must update the IP address",
        "B. The rebinding timer is 87.5% of the total lease period",
        "C. If the 'rebinding timer' expires but the client has not received a response from the server, it will keep sending a DHCP REQUEST message to the DHCP server that has previously assigned an IP address until the total lease period expires",
        "D. During the lease period, if the client receives a DHCP NAK message, the client will immediately stop using this IP address, return to the initialization state, and re-apply for a new IP address"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 232,
      "question_text": "The DHCP protocol can assign some TCP/IP-related parameter information to the client. In the process, DHCP defines a variety of messages. The encapsulation of these messages is?",
      "options": [
        "A. TCP encapsulation",
        "B. UDP encapsulation",
        "C. PPP encapsulation",
        "D. IP encapsulation"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 233,
      "question_text": "which of the following service priority description in DSCP is correct?",
      "options": [
        "A. AF has priority over EH",
        "B. The packet loss rate of AF11 is higher than that of AF12",
        "C. CS has the highest priority",
        "D. AF11 priority is higher than AF4"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 234,
      "question_text": "LDP neighbor discovery has different implementation mechanisms and regulations. which of the following description about LDP neighbor discovery is wrong?",
      "options": [
        "A. LDP discovery mechanism includes LDP basic discovery mechanism and LDP extended discovery mechanism",
        "B. The basic LDP discovery mechanism can automatically discover LDP Peers directly connected to the same link",
        "C. LDP extended discovery mechanism can discover non-directly connected LDP Peers",
        "D. The LDP discovery mechanism needs to clearly specify the LDP Peer"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 235,
      "question_text": "OPX is defined as?",
      "options": [
        "A. Maintenance cost",
        "B. Total Cost of Ownership",
        "c. Operating costs",
        "D. Operation and maintenance costs"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 236,
      "question_text": "What shortcomings can RED technology solve?",
      "options": [
        "A. TCP global synchronization phenomenon",
        "B. TCP starvation phenomenon",
        "C. Indiscriminate discard"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 237,
      "question_text": "RTA uses NAT technology, and implements many-to-many NAPT address translation by defining an address pool, so that hosts in the private network can access the public network. Suppose there are only two public IP addresses in the address pool, and they have been assigned to hosts A and B for address translation. If host C also wants to access the public network, which of the following description is correct?",
      "options": [
        "A. Host C cannot be assigned a public network address and cannot access the public network",
        "B. All hosts can access the public network by using the public network address in turn",
        "C. RTA converts the source port of host C, and host C can access the public network",
        "D. RTA assigns the interface address (200.10.10.3) to host C, and host C can access the public network"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 238,
      "question_text": "The three basic features of the SDN network architecture are?",
      "options": [
        "A. Transfer control separation, centralized control, open interface",
        "B. Transfer control points high, decentralized control, open interface",
        "C. Centralized control, centralized control, open interface",
        "D. Separation of transfer and control, centralized control, closed interface"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 239,
      "question_text": "The main technical school of SDN advocates that SDN adopts a layered open architecture. May I ask which technical school advocates and defines centralized architecture and Openflow?",
      "options": [
        "A. ETSI",
        "B. ONF",
        "C. TU",
        "D. IETF"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 240,
      "question_text": "Which of the following is not included in the VRP system login method?",
      "options": [
        "A. Telnet",
        "B. Netstream",
        "C. SSH",
        "D. web"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 241,
      "question_text": "In standard STP mode, which port of the following non-root switch will forward the TC set BPDU generated by the root switch?",
      "options": [
        "A. Specify port",
        "B. Root port",
        "C. Backup port",
        "D. Preparatory port"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 242,
      "question_text": "The VTEP tunnel established by vSwitch can be used between different virtual machines to carry out VXLAN communication, then the communication process of VXLAN is?\n1. The source VTEP encapsulates the ARP broadcast sent by the source VM into a multicast packet and sends it to the L3 network\n2. After the destination VTEP receives the multicast packet, it learns the mapping relationship between the source VM and the VTEP, and forwards the multicast packet to the local VM\n3. Local unicast response\n4. The target VTEP encapsulates the VXLAN tunnel and establishes a mapping table. After encapsulation, the unicast is sent to the source VTEP.\n5. The source VTEP receives the mapping relationship between the target VM and the target VTEP, and removes the tunnel and forwards it to the source VM.\n6. The source VM and the target VM perform unicast message communication through the tunnel",
      "options": [
        "A. 1-3-2-4-6-5",
        "B. 3-5-2-4-1-3",
        "C. 1-2-3-4-5-6",
        "D. 1-5-6-4-3-2"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 243,
      "question_text": "Which of the following is not included in the limitations of traditional networks?",
      "options": [
        "A. The speed of upgrading new services on the network is relatively slow.",
        "B. It is difficult to implement complex operation and maintenance of network protocols.",
        "C. Devices from different manufacturers have similar implementation mechanisms, and the difference in operation commands is small, which is easy to operate.",
        "D. The ability to adjust the traffic path is not flexible enough."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 244,
      "question_text": "The network administrator of a company wants to divide users who often change office locations and often access the company network through different switches into VLAN10. Which of the following methods should be used to divide VLANs?",
      "options": [
        "A. Protocol-based VLAN division",
        "B. Divide VLAN based on MAC address",
        "C. Port-based VLAN division",
        "D. Based on subnetting VLAN"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 245,
      "question_text": "Which of the following commands is used to configure the VRRP preemption delay?",
      "options": [
        "A. vrrp vrid 1 preempt-delay 20",
        "B. vrrp vrid 1 preempt-mode timer delay 20",
        "C. vrrp vrid 1 timer delay 20",
        "D. vrrp vrid 1 preempt-timer 20"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 246,
      "question_text": "By default, what is the lease period for the DHCP server to assign IP addresses?",
      "options": [
        "A. 12h",
        "B. 1h",
        "C. 24h",
        "D. 18h"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 247,
      "question_text": "If there is no security policy configured in the inter-zone of the firewall, or when searching for security policies, all the security policies are not hit, then which of the following default packet filtering action of the inter-zone is executed by default?",
      "options": [
        "A. Only part of the passage is allowed",
        "B. Refusal to pass",
        "C. Escalate to Administrator",
        "D. Different applications have different default actions"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 248,
      "question_text": "Which of the following descriptions about Trunk port and Access port is correct?",
      "options": [
        "A. Trunk ports can only send untagged frames",
        "B. The Access port can only send untagged frames",
        "C. The Access port can only send tagged frames",
        "D. Trunk ports can only send tagged frames"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 249,
      "question_text": "Which of the following descriptions of 'message marking' is wrong?",
      "options": [
        "A. The QoS information field of the message can be marked",
        "B. It can mark the DSCP and IP Precedence information of IP packets",
        "C. The 802.1P information of VLAN packets can be marked",
        "D. The MAC of the message can be marked"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 250,
      "question_text": "Which of the following is the range of manual setting of VRRP priority?",
      "options": [
        "A. 1~127",
        "B. 0~127",
        "C. 1~254",
        "D. 0~254"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 251,
      "question_text": "The QoS technology usually used for congestion avoidance is?",
      "options": [
        "A. GTS",
        "B. LR",
        "C. Car",
        "D. WRED"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 252,
      "question_text": "In the label forwarding table of the running MPLS device, for the same route, the incoming label and outgoing label:",
      "options": [
        "A. must be different",
        "B. must be the same",
        "C. may be the same"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 253,
      "question_text": "In the label forwarding table of the MPLS device, for different routes (the next hop is also different), the outgoing label:",
      "options": [
        "A. must be different",
        "B. must be the same",
        "C. may be the same"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 254,
      "question_text": "In the alarm management function of eSight, its alarm levels are divided into which of the following four types?",
      "options": [
        "A. Urgent, Minor, General, Reminder",
        "B. Urgent, Important, Major, Reminder",
        "C. Urgent, important, warning, reminder",
        "D. Urgent, important, minor, reminder"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 255,
      "question_text": "In the MPLS network, the switch will assign labels. Which of the following description of the label assignment method is correct?",
      "options": [
        "A. The downstream LSR can decide to assign the label to a specific FEC, and then notify the upstream LSR",
        "B. Downstream on demand DoD (downstream on demand) means that for a specific FEC, the LSR does not need to obtain a label request message from the upstream to perform label allocation and distribution.",
        "C. The downstream autonomous label allocation method means that for a specific FEC, the LSR performs label allocation and distribution after obtaining the label request message.",
        "D. The label publishing methods used by the upstream LSR and the downstream LSR with label distribution adjacency can be the same"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 256,
      "question_text": "In the inter-zone security policy of the firewall, which of the following data flows is not in the outbound direction?",
      "options": [
        "A. Data flow from the Trust zone to the DMZ zone.",
        "B. Data flow from the Trust zone to the Untrust zone.",
        "C. Data flow from the Trust zone to the Local zone.",
        "D. Data flow from the DMZ area to the Untrust area."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 257,
      "question_text": "When configuring a RADIUS server template on a Huawei switch, which of the following options are optional configuration parameters?",
      "options": [
        "A. Authentication server address and port",
        "B. RADIUS automatically detects users",
        "C. Billing server address and port",
        "D. Shared-key"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 258,
      "question_text": "When configuring MPLS VPNI, the administrator configured the following commands. Which of the following description for this command is wrong?\ninterface GigabitEthernet0/0/0\nip binding vpn-instance VPN1\ninterface GigabitEthernet0/0/1\nip binding vpn-instance VPN2",
      "options": [
        "A. This configuration command is usually configured on the PE device",
        "B. The function of this command is to bind the G0/0/1 and G0/0/2 interfaces on the PE device with the VPN instance assigned to the customer network",
        "C. After the interface on the device is bound to the VPN instance, the interface will become a private network interface, and can configure a private network address and run a private network routing protocol.",
        "D. If the binding between the interface and the VPN instance is canceled, the device will not automatically clear the IPv4 or IP6 related configuration under the interface bound to the VPN instance"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 259,
      "question_text": "On Huawei routers, by default, the value of the internal routing priority of the OSPF protocol is?",
      "options": [
        "A. 20",
        "B. 10",
        "C. 30",
        "D. 1"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 260,
      "question_text": "What is the main function of the dynamic routing protocol?",
      "options": [
        "A. Generate IP address",
        "B. Dynamically generate routing entries",
        "C. Control router interface status",
        "D. Manage the router"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 261,
      "question_text": "How to deal with when the Trunk port sends data frames?",
      "options": [
        "A. When the VLAN ID is different from the PVID of the port, replace it with PVID forwarding",
        "B. When the VLAN ID is different from the PVID of the port, discard the data frame",
        "C. When the VLAN ID is the same as the PVID of the port and is the VLAN ID allowed by the port, remove the Tag and send the message",
        "D. When the VLAN ID is different from the PVID of the port, strip the TAG forwarding"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    }
  ]
}
