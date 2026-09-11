window.examData_H12_811_V2_0_101 = {
  "exam_code": "H12-811_V2.0_101",
  "exam_name": "HCIA-Datacom V2.0 - 101 Preguntas",
  "provider": "Huawei",
  "version": "v2026-09-11",
  "questions": [
    {
      "id": 1,
      "question_text": "NAPT and Easy IP translate both IP addresses and port numbers, enabling multiple private IP addresses to share multiple public IP addresses.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 2,
      "question_text": "When a Huawei device operates as an SSH client and logs in to another network device for the first time, the ssh client first-time enable command must be executed to enable the SSH client’s first-time login function. Otherwise, the login will fail.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 3,
      "question_text": "AAA stands for authentication, authorization, and accounting. The accounting function records only fees incurred when users consume network resources, and does not record Internet-access traffic or duration.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 4,
      "question_text": "R1 has these configurations:\n\n[R1] nat address-group test 1  \n[R1-address-group-test] section 1 100.1.23.1 100.1.23.254  \n[R1-address-group-test] mode pat  \n[R1-address-group-test] quit  \n[R1] nat-policy  \n[R1-policy-nat] rule name test  \n[R1-policy-nat-rule-test] source-address range 192.168.0.0 192.168.255.255  \n[R1-policy-nat-rule-test] action source-nat address-group test  \n[R1-policy-nat-rule-test] quit  \n[R1-policy-nat] quit  \n[R1] interface GE 0/0/2  \n[R1-GE0/0/2] nat enable  \n[R1-GE0/0/2] quit\n\nWhich of the following statements is incorrect?",
      "options": [
        "A. The intranet user with the IP address 192.168.1.100 can access the public network.",
        "B. If data packets from intranet users are not sent through GE0/0/2 of R1, the users may fail to access the public network.",
        "C. An intranet user's post-NAT IP address may be 100.1.23.254.",
        "D. The post-NAT IP addresses of intranet users with different IP addresses must be different."
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 5,
      "question_text": "When an FTP client signs in to a Huawei network device operating as an FTP server, which command can upload a local file to that FTP server?",
      "options": [
        "A. dir",
        "B. delete",
        "C. put",
        "D. get"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 6,
      "question_text": "The ongoing development and innovation of upper-layer services impose higher requirements on general-purpose computing data-center networks. Which of the following requirements can be fulfilled by deploying M-LAG and Eth-Trunk? (Choose two)",
      "options": [
        "A. High availability",
        "B. High aggregated bandwidth",
        "C. Elastic scalability",
        "D. Large Layer 2 migration of VMs"
      ],
      "correct_answers": [
        "A",
        "B"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 7,
      "question_text": "In an intelligent-computing data center network, network administrators deploy intelligent lossless-network technologies, such as PFC, to create a high-speed, low-latency lossless network. Which of the following statements about PFC operating principles are false? (Choose two)",
      "options": [
        "A. After PFC is deployed, the receive end sends PFC packets to the transmit end when the buffer is full, requesting the transmit end to reduce the packet sending rate.",
        "B. After backpressure is triggered, the receive end sends PFC stop packets to the transmit end only after the buffer of the receive end is cleared.",
        "C. After PFC is deployed, the receive end sends PFC packets to the transmit end when the received traffic exceeds a certain buffer threshold, requesting the transmit end to reduce the packet sending rate.",
        "D. After backpressure is triggered, the receive end sends PFC stop packets to the transmit end as long as the buffer of the receive end decreases to a certain extent."
      ],
      "correct_answers": [
        "A",
        "B"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 8,
      "question_text": "On a general-purpose computing data-center network, network administrators must use different network technologies or architectures to maintain high network stability and efficiency. Match each network technology or architecture to the requirement it meets.",
      "type": "drag_drop",
      "drag_items": [
        "M-LAG",
        "Spine-Leaf",
        "VXLAN"
      ],
      "drop_targets": [
        {
          "target": "High availability",
          "answer": "M-LAG"
        },
        {
          "target": "User Isolation",
          "answer": "VXLAN"
        },
        {
          "target": "Scalability",
          "answer": "Spine-Leaf"
        }
      ],
      "correct_answers": [
        "High availability -> M-LAG",
        "User Isolation -> VXLAN",
        "Scalability -> Spine-Leaf"
      ],
      "options": [
        "High availability -> M-LAG",
        "User Isolation -> VXLAN",
        "Scalability -> Spine-Leaf"
      ],
      "image": null
    },
    {
      "id": 9,
      "question_text": "In WLAN networking, APs function as infrastructure that provides wireless communication services for STAs. For a STA to discover and connect to an AP, the AP must communicate its identity to the STA. Which of the following represents this identity?",
      "options": [
        "A. BSS",
        "B. ESS",
        "C. VAP",
        "D. BSSID"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 10,
      "question_text": "An engineer is setting up Fit AP onboarding on a Huawei WAC. After completing network connectivity and CAPWAP configuration, the engineer must next configure the AP authentication mode. Which AP authentication modes are available for the engineer to configure? (Choose three)",
      "options": [
        "A. [WAC-wlan-view] ap auth-mode ip-auth",
        "B. [WAC-wlan-view] ap auth-mode mac-auth",
        "C. [WAC-wlan-view] ap auth-mode sn-auth",
        "D. [WAC-wlan-view] ap auth-mode no-auth"
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
      "id": 11,
      "question_text": "Huawei introduced a leader AP networking solution for small and micro enterprises. APs may operate independently or manage a small quantity of APs. Which of the following statements are correct about the leader AP networking architecture? (Choose three)",
      "options": [
        "A. This networking supports WLAN roaming.",
        "B. The leader AP can serve as a DHCP server to assign IP addresses to STAs.",
        "C. The leader AP uses the CAPWAP protocol to uniformly manage and configure other Fit APs.",
        "D. The leader AP works in Fit mode."
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
      "id": 12,
      "question_text": "Which of the following configurations configures the WPA2 security policy on a Huawei WAC?",
      "options": [
        "A. [WAC-wlan-sec-prof-name] security wpa psk pass-phrase a1234567 aes",
        "B. [WAC-wlan-sec-prof-name] security wpa2 certificate",
        "C. [WAC-wlan-sec-prof-name] security wpa2 psk pass-phrase a1234567 aes",
        "D. [WAC-wlan-sec-prof-name] security open"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 13,
      "question_text": "Which of the following variables defined in Python code is not valid?",
      "options": [
        "A. ipv4_address = ‘1000.1000.1000.1000/96’",
        "B. 2_r1 = ‘ipv6 enable’",
        "C. _static = ‘ip route 0.0.0.0 0 ge0/0/l’",
        "D. sysname = ‘huawei’"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 14,
      "question_text": "During WLAN deployment, a Fit AP cannot go online on the WAC. You log in to the WAC and run the display ap all command to check the AP status. The output indicates the AP status is unauth, meaning that the AP has failed authentication. You therefore need to confirm the AP on the WAC so that it can go online.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 15,
      "question_text": "When deploying a WLAN that uses the WAC + Fit AP architecture on a customer’s production network, you discover that APs cannot come online. Which of the following could be causes? (Choose four)",
      "options": [
        "A. The DHCP configuration is incorrect, preventing APs from obtaining IP addresses.",
        "B. The connection between the WAC and APs is unavailable.",
        "C. No CAPWAP address is configured on the WAC.",
        "D. The current working mode of the APs is Fat."
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
      "id": 16,
      "question_text": "Before using a class from a third-party library in Python code, you must import the relevant modules with import or from ... import statements.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 17,
      "question_text": "Assume you are unable to configure an IP address on GE1/0/1 of a Huawei switch. Which command can you execute in the interface view to fix this issue?",
      "options": [
        "A. port link-type hybrid",
        "B. undo portswitch",
        "C. port link-type trunk",
        "D. port link-type access"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 18,
      "question_text": "When designing IPv4 addressing for a campus network, which of the following methods can be used to assign an IP address to the interface that connects the campus egress device to the WAN? (Choose three)",
      "options": [
        "A. Using DHCP to dynamically assign an IP address",
        "B. Using PPPoE to obtain an IP address",
        "C. Manually configuring a static IP address",
        "D. Using SLAAC to automatically obtain an IP address"
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
      "id": 19,
      "question_text": "Enabling STP and configuring the core device to be the root bridge is recommended even when no physical loop exists in the switched network. This prevents Layer 2 loops resulting from incorrect connections between devices and avoids network reconvergence caused by root-bridge preemption.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 20,
      "question_text": "Several distinct topologies exist for data communication networks. Which of the following network topologies risks a network-wide communication failure if a single device fails?",
      "options": [
        "A. Ring topology",
        "B. Star topology",
        "C. Mesh topology",
        "D. Tree topology"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 21,
      "question_text": "Huawei network devices support multiple kinds of storage devices. After an administrator runs the save command in a switch's user view, the current configuration file is saved to SDRAM. After the switch restarts, the configuration file still takes effect.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 22,
      "question_text": "FTP lets users remotely access a network device to manage configuration files, such as by uploading and downloading files, and to change configurations, such as renaming the device and configuring an IP address.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 23,
      "question_text": "A web server and a DNS server are deployed on a network. When a user enters a website address on a client to open a web page, which of the following information does the DNS server return to the client?",
      "options": [
        "A. URL",
        "B. IP address",
        "C. Domain name",
        "D. MAC address"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 24,
      "question_text": "If host A needs to communicate with host B on a different subnet, host A broadcasts an ARP request to learn host B’s MAC address. After host B receives the request, it sends an ARP response informing host A of its MAC address.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 25,
      "question_text": "On a switched network with STP enabled on every device, when a downstream device detects a topology change, does it continuously send configuration BPDUs to the upstream device until the root bridge is notified of the topology change?",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 26,
      "question_text": "In the small WLAN illustrated, SW2 functions as the DHCP server that assigns IP addresses to STAs, and user-data traffic uses direct forwarding. Which traffic path does a STA use to access the Internet after it connects to the WLAN through AP1?",
      "options": [
        "A. AP2 -> WAC -> SW2 -> Internet",
        "B. AP1 -> SW1 -> SW2 -> Internet",
        "C. AP1 -> SW1 -> SW2 -> WAC -> SW2 -> Internet",
        "D. AP1 -> WAC -> SW2 -> Internet"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "q26.png"
    },
    {
      "id": 27,
      "question_text": "After checking the status of GE0/0/1 on R1, the command output below is obtained. Which of the following statements are correct? (Choose three)",
      "options": [
        "A. The physical status of the interface is UP.",
        "B. The PVID of the interface is 1.",
        "C. The interface is an Ethernet optical interface.",
        "D. The MAC address of the interface is b0c7-8733-d65c."
      ],
      "correct_answers": [
        "A",
        "B",
        "D"
      ],
      "type": "multiple",
      "image": "q27.png"
    },
    {
      "id": 28,
      "question_text": "In the small WLAN shown, the WAC functions as the DHCP server, assigning IP addresses to APs and STAs. The management VLAN is 100, the service VLAN is 110, and user data is forwarded in tunnel mode. Which switch and WAC interface configuration is correct?",
      "options": [
        "A. [SW] interface gigabitethernet 0/0/1 ... port trunk allow-pass vlan 100 110 ... [SW-GigabitEthernet0/0/2] port trunk allow-pass vlan 110 ... [WAC-GigabitEthernet0/0/1] port trunk allow-pass vlan 110",
        "B. [SW] interface gigabitethernet 0/0/1 ... port trunk pvid 100 ... port trunk allow-pass vlan 100 ... [SW-GigabitEthernet0/0/2] port trunk allow-pass vlan 100 ... [WAC-GigabitEthernet0/0/1] port trunk allow-pass vlan 100",
        "C. [SW] interface gigabitethernet 0/0/1 ... port trunk pvid 110 ... port trunk allow-pass vlan 100 110 ...",
        "D. [SW] interface gigabitethernet 0/0/1 ... port trunk pvid 110 ... port trunk allow-pass vlan 100 110 ... [WAC] ... port trunk allow-pass vlan 100 110"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "q28.png"
    },
    {
      "id": 29,
      "question_text": "On the campus network shown below, Core1 operates as the Layer 3 gateway and DHCP server, interconnected with R1 through VLAN 11 and with WAC1 through VLAN 12. AP1 obtains an IP address from Core1 through VLAN 100, and PC1, PC2, and PC3 obtain IP addresses through VLAN 102, VLAN 100, and VLAN 101, respectively. User traffic from PC1 is forwarded in direct forwarding mode. Match each device interface to its allowed VLANs.",
      "type": "drag_drop",
      "image": "q29.png",
      "drag_items": [
        "VLAN 100",
        "VLAN 101",
        "VLAN 102",
        "VLAN 100 and VLAN 101",
        "VLAN 101 and VLAN 102",
        "VLAN 100 and VLAN 102",
        "VLAN 100, VLAN 101, and VLAN 102"
      ],
      "drop_targets": [
        {
          "target": "GE1/0/1 of ACC1",
          "answer": "VLAN 100"
        },
        {
          "target": "GE1/0/3 of ACC1",
          "answer": "VLAN 100 and VLAN 102"
        },
        {
          "target": "GE1/0/1 of ACC2",
          "answer": "VLAN 102"
        },
        {
          "target": "GE1/0/2 of Core1",
          "answer": "VLAN 100 and VLAN 102"
        },
        {
          "target": "GE1/0/3 of Core1",
          "answer": "VLAN 102"
        },
        {
          "target": "GE1/0/4 of Core1",
          "answer": "VLAN 101"
        }
      ],
      "correct_answers": [
        "GE1/0/1 of ACC1 -> VLAN 100",
        "GE1/0/3 of ACC1 -> VLAN 100 and VLAN 102",
        "GE1/0/1 of ACC2 -> VLAN 102",
        "GE1/0/2 of Core1 -> VLAN 100 and VLAN 102",
        "GE1/0/3 of Core1 -> VLAN 102",
        "GE1/0/4 of Core1 -> VLAN 101"
      ],
      "options": [
        "GE1/0/1 of ACC1 -> VLAN 100",
        "GE1/0/3 of ACC1 -> VLAN 100 and VLAN 102",
        "GE1/0/1 of ACC2 -> VLAN 102",
        "GE1/0/2 of Core1 -> VLAN 100 and VLAN 102",
        "GE1/0/3 of Core1 -> VLAN 102",
        "GE1/0/4 of Core1 -> VLAN 101"
      ]
    },
    {
      "id": 30,
      "question_text": "LACP dynamically establishes an Eth-Trunk between SW1 and SW2. SW1 and SW2 each have eight interfaces available for aggregation, but only four links must be active. Which parameter should the administrator configure to determine the switch responsible for selecting the active links?",
      "options": [
        "A. Interface cost",
        "B. Interface index",
        "C. LACP interface priority",
        "D. LACP system priority"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 31,
      "question_text": "The administrator uses the interface Eth-Trunk 1 command to create Eth-Trunk 1 on SW1 and SW2. After the network stabilizes, the administrator runs display interface brief on SW1 and finds that Eth-Trunk 1 is Down, its member interfaces are in a normal state, and SW1's configuration is correct. A possible cause is that the member interfaces on SW2 have not been added to Eth-Trunk 1.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 32,
      "question_text": "To ensure that the same data flow is forwarded over the same physical link in a link aggregation group (LAG), while different data flows can be load-balanced across different physical links in the LAG, an administrator must enable per-packet load balancing on the devices at both ends of the LAG.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 33,
      "question_text": "There are two Ethernet frame formats: Ethernet_II and IEEE 802.3. Ethernet_II uses the Type field to identify the upper-layer protocol type, whereas IEEE 802.3 uses the Tag field to identify the upper-layer protocol type.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 34,
      "question_text": "Each host has its own network interface card (NIC), and each NIC receives a globally unique MAC address during manufacturing. Which of the following is a valid MAC address for a host NIC?",
      "options": [
        "A. 01-1A-2B-C3-4D-5E",
        "B. 02-1A-2B-C3-4D-5E",
        "C. FF-1A-2B-C3-4D-5E",
        "D. FF-FF-FF-FF-FF-FF"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 35,
      "question_text": "On the network shown, an administrator creates an Eth-Trunk between SW1 and SW2. Match each problem to its troubleshooting method.",
      "type": "drag_drop",
      "image": "q35.png",
      "drag_items": [
        "Check whether the aggregation modes at both ends of the Eth-Trunk match.",
        "Run the display interface brief command to check the status and error statistics of physical interfaces.",
        "Check whether the lists of allowed VLANs on the Eth-Trunk interfaces at both ends are the same."
      ],
      "drop_targets": [
        {
          "target": "GE1/0/3 added to the Eth-Trunk is always in Down state.",
          "answer": "Run the display interface brief command to check the status and error statistics of physical interfaces."
        },
        {
          "target": "The traffic sent from PC1 cannot reach PC3 after passing through the Eth-Trunk.",
          "answer": "Check whether the lists of allowed VLANs on the Eth-Trunk interfaces at both ends are the same."
        },
        {
          "target": "The Eth-Trunk cannot be established between the two devices.",
          "answer": "Check whether the aggregation modes at both ends of the Eth-Trunk match."
        }
      ],
      "correct_answers": [
        "GE1/0/3 added to the Eth-Trunk is always in Down state. -> Run the display interface brief command to check the status and error statistics of physical interfaces.",
        "The traffic sent from PC1 cannot reach PC3 after passing through the Eth-Trunk. -> Check whether the lists of allowed VLANs on the Eth-Trunk interfaces at both ends are the same.",
        "The Eth-Trunk cannot be established between the two devices. -> Check whether the aggregation modes at both ends of the Eth-Trunk match."
      ],
      "options": [
        "GE1/0/3 added to the Eth-Trunk is always in Down state. -> Run the display interface brief command to check the status and error statistics of physical interfaces.",
        "The traffic sent from PC1 cannot reach PC3 after passing through the Eth-Trunk. -> Check whether the lists of allowed VLANs on the Eth-Trunk interfaces at both ends are the same.",
        "The Eth-Trunk cannot be established between the two devices. -> Check whether the aggregation modes at both ends of the Eth-Trunk match."
      ]
    },
    {
      "id": 36,
      "question_text": "In the switched network shown, STP is enabled on every device. SW1 is the root bridge. The port costs are displayed in the figure, and all other parameters retain their default values. Once the network has stabilized, which RPC value does SW4 calculate for its path to SW1?",
      "options": [
        "A. 50",
        "B. 80",
        "C. 40",
        "D. 70"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": "q36.png"
    },
    {
      "id": 37,
      "question_text": "The Protocol field in a packet’s IP header indicates the upper-layer protocol that will continue processing the packet. For an ICMP packet, the Protocol field defaults to 0.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 38,
      "question_text": "Assume that the IPv6 address assigned to GE0/0/0 on R1 is 2001:db8:12::1/64. Which of the following is the solicited-node multicast address for this IPv6 address?",
      "options": [
        "A. FF02::l:FF00:1",
        "B. FF02::2",
        "C. FF02::l",
        "D. FF02::l:FF9E:10"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 39,
      "question_text": "On the network shown, PC1 and PC4 are in VLAN 10, while PC2 and PC3 are in VLAN 20. GE1/0/3 of SW1 and GE1/0/3 of SW2 are interconnected. Match each interface with its configuration.",
      "type": "drag_drop",
      "image": "q39.png",
      "drag_items": [
        "port link-type access\\nport default vlan 10",
        "port link-type access\\nport default vlan 20",
        "port link-type hybrid\\nport hybrid untagged vlan 10 20",
        "port link-type hybrid\\nport hybrid tagged vlan 10 20"
      ],
      "drop_targets": [
        {
          "target": "GE1/0/1 of SW1",
          "answer": "port link-type access\\nport default vlan 10"
        },
        {
          "target": "GE1/0/2 of SW1",
          "answer": "port link-type access\\nport default vlan 20"
        },
        {
          "target": "GE1/0/3 of SW1",
          "answer": "port link-type hybrid\\nport hybrid tagged vlan 10 20"
        },
        {
          "target": "GE1/0/1 of SW2",
          "answer": "port link-type access\\nport default vlan 20"
        },
        {
          "target": "GE1/0/2 of SW2",
          "answer": "port link-type access\\nport default vlan 10"
        },
        {
          "target": "GE1/0/3 of SW2",
          "answer": "port link-type hybrid\\nport hybrid tagged vlan 10 20"
        }
      ],
      "correct_answers": [
        "GE1/0/1 of SW1 -> port link-type access\\nport default vlan 10",
        "GE1/0/2 of SW1 -> port link-type access\\nport default vlan 20",
        "GE1/0/3 of SW1 -> port link-type hybrid\\nport hybrid tagged vlan 10 20",
        "GE1/0/1 of SW2 -> port link-type access\\nport default vlan 20",
        "GE1/0/2 of SW2 -> port link-type access\\nport default vlan 10",
        "GE1/0/3 of SW2 -> port link-type hybrid\\nport hybrid tagged vlan 10 20"
      ],
      "options": [
        "GE1/0/1 of SW1 -> port link-type access\\nport default vlan 10",
        "GE1/0/2 of SW1 -> port link-type access\\nport default vlan 20",
        "GE1/0/3 of SW1 -> port link-type hybrid\\nport hybrid tagged vlan 10 20",
        "GE1/0/1 of SW2 -> port link-type access\\nport default vlan 20",
        "GE1/0/2 of SW2 -> port link-type access\\nport default vlan 10",
        "GE1/0/3 of SW2 -> port link-type hybrid\\nport hybrid tagged vlan 10 20"
      ]
    },
    {
      "id": 40,
      "question_text": "On the switched network shown, STP is enabled on every device. SW1 is the root bridge, and the figure shows the port costs. All other parameters use their default values. Match the stable port roles to the ports.",
      "type": "drag_drop",
      "image": "q40.png",
      "drag_items": [
        "Designated port",
        "Root port",
        "Alternate port"
      ],
      "drop_targets": [
        {
          "target": "GE1/0/1 of SW1",
          "answer": "Designated port"
        },
        {
          "target": "GE1/0/2 of SW1",
          "answer": "Designated port"
        },
        {
          "target": "GE1/0/1 of SW2 (towards SW1)",
          "answer": "Root port"
        },
        {
          "target": "GE1/0/3 of SW2 (towards SW3)",
          "answer": "Designated port"
        },
        {
          "target": "GE1/0/2 of SW3 (towards SW1)",
          "answer": "Alternate port"
        },
        {
          "target": "GE1/0/3 of SW3 (towards SW2)",
          "answer": "Root port"
        }
      ],
      "correct_answers": [
        "GE1/0/1 of SW1 -> Designated port",
        "GE1/0/2 of SW1 -> Designated port",
        "GE1/0/1 of SW2 (towards SW1) -> Root port",
        "GE1/0/3 of SW2 (towards SW3) -> Designated port",
        "GE1/0/2 of SW3 (towards SW1) -> Alternate port",
        "GE1/0/3 of SW3 (towards SW2) -> Root port"
      ],
      "options": [
        "GE1/0/1 of SW1 -> Designated port",
        "GE1/0/2 of SW1 -> Designated port",
        "GE1/0/1 of SW2 (towards SW1) -> Root port",
        "GE1/0/3 of SW2 (towards SW3) -> Designated port",
        "GE1/0/2 of SW3 (towards SW1) -> Alternate port",
        "GE1/0/3 of SW3 (towards SW2) -> Root port"
      ]
    },
    {
      "id": 41,
      "question_text": "The administrator configures SW1 as shown... runs the undo vlan 10 command... Which of the following statements about this scenario are false? (Choose three)",
      "options": [
        "A. SW1 accepts the data frame sent from PC1 to PC2, but discards the data frame returned from PC2 to PC1.",
        "B. PC1 can still ping the IP address of PC2.",
        "C. After receiving the data frame sent from PC1 to PC2, SW1 adds the VLAN 10 tag to the data frame and then accepts the data frame.",
        "D. The data frame processed inside SW1 does not carry any VLAN tag."
      ],
      "correct_answers": [
        "A",
        "C",
        "D"
      ],
      "type": "multiple",
      "image": "q41.png"
    },
    {
      "id": 42,
      "question_text": "Unlike distance-vector routing protocols, link-state routing protocols advertise link states rather than route information. Common link-state routing protocols include RIP, OSPF, and IS-IS.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 43,
      "question_text": "Which commands can be used to enable OSPF on R1’s loopback interface, 10.0.1.1/32? (Choose four)",
      "options": [
        "A. network 0.0.0.0 255.255.255.255",
        "B. network 10.0.0.0 0.0.255.255",
        "C. network 10.0.1.1 0.0.0.0",
        "D. network 10.0.1.0 0.0.0.255"
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
      "id": 44,
      "question_text": "An IPv6 address is 128 bits in length and is typically expressed in hexadecimal notation, for example, 2001:0001:0DB8:2345:CD30:1230:4567:89AB:CDEF.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 45,
      "question_text": "Given the routing table below, which source IP address does R1 use when it sends an ICMP packet to ping 10.0.3.3?",
      "options": [
        "A. 10.0.12.2",
        "B. 10.0.23.3",
        "C. 10.0.23.2",
        "D. 10.0.2.2"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": "q45.png"
    },
    {
      "id": 46,
      "question_text": "In the network shown, STP is enabled on every device... After GE1/0/1 on SW1 fails and the network becomes stable, GE1/0/2 on SW2 becomes the designated port.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "q46.png"
    },
    {
      "id": 47,
      "question_text": "In IPv4, the Options field can increase the header length from 20 bytes to as much as 60 bytes. To support additional options, IPv6 introduces the concept of extension headers. This approach permits new options to be added without changing the existing header structure, demonstrating strong flexibility.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 48,
      "question_text": "Private addresses are network or host addresses restricted to use within internal networks and cannot be used directly for Internet access. Which of the following IP addresses is not a private IP address?",
      "options": [
        "A. 10.0.12.1/24",
        "B. 192.168.1.1/24",
        "C. 172.32.32.32/24",
        "D. 192.168.255.254/24"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 49,
      "question_text": "In the network shown, R1 acts as the gateway for PC2 and PC3... Which statements are true if PC2 and PC3 can communicate with one another? (Choose three)",
      "options": [
        "A. R1 can terminate data frames of VLANs 2 and 3.",
        "B. Sub-interfaces GE0/0/1.2 and GE0/0/1.3 have been created on R1.",
        "C. S1 has ARP entries of PC2 and PC3.",
        "D. S1 has MAC address entries of PC2 and PC3."
      ],
      "correct_answers": [
        "A",
        "B",
        "D"
      ],
      "type": "multiple",
      "image": "q49.png"
    },
    {
      "id": 50,
      "question_text": "Based on the following routing table, it can be concluded that the IP address of VLANIF 2 on R1 is 10.0.12.1/24.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": "q50.png"
    },
    {
      "id": 51,
      "question_text": "A user's domain is determined by the user name the user uses to log in to the NAS device. If the domain name included in that user name is not configured on the NAS device, authentication fails.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 52,
      "question_text": "A Huawei network device that operates as an AAA server is called a local AAA server. Compared with a remote AAA server, a local AAA server lowers operating costs. However, the volume of information a local AAA server can store is constrained by the device's hardware performance.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 53,
      "question_text": "In the network shown, S2 operates as a DHCP server with four address pools, R1 acts as a DHCP relay agent, and S1 operates as a DHCP client. Which of the following IPv4 addresses may be assigned to S1 by DHCP?",
      "options": [
        "A. 10.0.12.253/24",
        "B. 192.168.2.2/24",
        "C. 192.168.1.108/24",
        "D. 10.0.13.13/24"
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": "q53.png"
    },
    {
      "id": 54,
      "question_text": "ACLs are categorized as basic ACLs, advanced ACLs, and Layer 2 ACLs according to the rule type. Drag each ACL rule to its correct position.",
      "type": "drag_drop",
      "drag_items": [
        "Basic ACL",
        "Advanced ACL",
        "Layer 2 ACL"
      ],
      "drop_targets": [
        {
          "target": "Defines packet filtering rules based on the information in Ethernet frame headers (source/destination MAC address, etc.).",
          "answer": "Layer 2 ACL"
        },
        {
          "target": "Defines packet filtering rules based on information such as source and destination IPv4 addresses, IP protocol types, TCP/UDP port numbers.",
          "answer": "Advanced ACL"
        },
        {
          "target": "Defines packet filtering rules based on information such as source IPv4 addresses, fragment information.",
          "answer": "Basic ACL"
        }
      ],
      "correct_answers": [
        "Defines packet filtering rules based on the information in Ethernet frame headers (source/destination MAC address, etc.). -> Layer 2 ACL",
        "Defines packet filtering rules based on information such as source and destination IPv4 addresses, IP protocol types, TCP/UDP port numbers. -> Advanced ACL",
        "Defines packet filtering rules based on information such as source IPv4 addresses, fragment information. -> Basic ACL"
      ],
      "options": [
        "Defines packet filtering rules based on the information in Ethernet frame headers (source/destination MAC address, etc.). -> Layer 2 ACL",
        "Defines packet filtering rules based on information such as source and destination IPv4 addresses, IP protocol types, TCP/UDP port numbers. -> Advanced ACL",
        "Defines packet filtering rules based on information such source IPv4 addresses, fragment information. -> Basic ACL"
      ],
      "image": null
    },
    {
      "id": 55,
      "question_text": "Within the TCP/IP reference model, certain application-layer protocols need low latency and high efficiency while permitting partial data loss during transmission. Which of the following application-layer protocols match this description? (Choose two)",
      "options": [
        "A. HTTP",
        "B. TFTP",
        "C. DNS",
        "D. Telnet"
      ],
      "correct_answers": [
        "B",
        "C"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 56,
      "question_text": "In the network shown, R1 and R2 are directly connected by a physical link. When the link is operating normally, can R1 ping the IP address of R2’s interface?",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "q56.png"
    },
    {
      "id": 57,
      "question_text": "In the OSPF network shown, all IP addresses can communicate with one another. The following configuration is then added on R1... Which S1 IP address can successfully ping 10.0.23.3?",
      "options": [
        "A. 10.1.1.1",
        "B. 10.0.1.1",
        "C. 10.3.1.1",
        "D. 10.2.1.1"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": "q57.png"
    },
    {
      "id": 58,
      "question_text": "To avoid key services being affected by insufficient Eth-Trunk bandwidth when too many links fail, an administrator runs the least active-linknumber 4 command on an Eth-Trunk with eight member interfaces, setting the minimum active-link count to 4. Which of the following conditions will cause the Eth-Trunk interface to go Down?",
      "options": [
        "A. Two member links fail.",
        "B. Five member links fall.",
        "C. Three member links fail.",
        "D. Four member links fail."
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 59,
      "question_text": "On a campus network, SW1 is an access switch with 24 downlink interfaces, all assigned to VLAN 1 by default. The administrator places SW1 interfaces 1 through 8 in VLAN 2 and interfaces 9 through 16 in VLAN 3, while keeping the default VLAN on the remaining interfaces. In this situation, all downstream devices connected to SW1 are in the same broadcast domain.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 60,
      "question_text": "The MAC address table for SW1 is shown in the figure. If SW1 receives a data frame from PC1 whose destination MAC address is 0050-5600-0004, which operation does SW1 perform on the data frame?",
      "options": [
        "A. SW1 sends the data frame through GE1/0/2, GE1/0/3, and GE1/0/4.",
        "B. SW1 sends the data frame through GE1/0/2.",
        "C. SW1 sends the data frame through GE1/0/3.",
        "D. SW1 sends the data frame through GE1/0/4."
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": "q60.png"
    },
    {
      "id": 61,
      "question_text": "The network administrator applies the configuration shown on SW1 and SW2. Which statements about this scenario are false? (Choose three)",
      "options": [
        "A. PC1 and PC2 can communicate with each other at Layer 2.",
        "B. PC1 and PC3 can communicate with each other at Layer 2.",
        "C. PC2 and PC3 can communicate with each other at Layer 2.",
        "D. PC2 and PC4 can communicate with each other at Layer 2."
      ],
      "correct_answers": [
        "A",
        "B",
        "C"
      ],
      "type": "multiple",
      "image": "q61.png"
    },
    {
      "id": 62,
      "question_text": "A small enterprise’s switches do not support LACP. As a result, the administrator manually bundles two links between two switches into an Eth-Trunk. Which statements about this scenario are false? (Choose four)",
      "options": [
        "A. If the peer interface of one link is incorrectly connected to another device, the local device detects the fault and stops forwarding service traffic through the link.",
        "B. If one of the links fails, the switches automatically add another normal link to the Eth-Trunk.",
        "C. If one of the links falls, the switches automatically removes the link from the link aggregation configuration.",
        "D. The two links in the Eth-Trunk work in active/standby mode, and only the active link forwards data."
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
      "id": 63,
      "question_text": "In the network shown, GE1/0/1 and GE1/0/2 on SW1 are access interfaces with PVIDs of VLAN 2 and VLAN 3, respectively. GE1/0/1 on SW2 is also an access interface, with a PVID of VLAN 4. Which configurations on SW1 and SW2 can ensure that packets sent by PC1 and PC2 reach PC3? (Choose two)",
      "options": [
        "A. Configure GE1/0/3 of SW1 as a hybrid interface, add it to VLAN 2 and VLAN 3 in untagged mode, and set its PVID to VLAN 4.",
        "B. Configure GE1/0/3 of SW1 as a trunk interface, configure it to allow packets from VLAN 2 and VLAN 3 to pass through, and set Its PVID to VLAN 4.",
        "C. Configure GE1/0/3 of SW2 as a trunk interface, configure it to allow packets from VLAN 4 to pass through, and set its PVID to VLAN 4.",
        "D. Configure GE1/0/3 of SW2 as a hybrid interface, add it to VLAN 4 in untagged mode, and retain the default PVID."
      ],
      "correct_answers": [
        "A",
        "C"
      ],
      "type": "multiple",
      "image": "q63.png"
    },
    {
      "id": 64,
      "question_text": "In an enterprise network, SW1 and SW2 are interconnected through an Eth-Trunk operating in LACP mode. The administrator configures the minimum number of active links as 3 on SW1. However, only two physical links exist between the switches, and both links are normal. Which statements about this scenario are true? (Choose two)",
      "options": [
        "A. The Eth-Trunk interface is Up.",
        "B. The Eth-Trunk interface is Down.",
        "C. The two physical interfaces are Down.",
        "D. The two physical interfaces are Up."
      ],
      "correct_answers": [
        "B",
        "D"
      ],
      "type": "multiple",
      "image": "q64.png"
    },
    {
      "id": 65,
      "question_text": "What is the broadcast address for the network containing a host at 192.168.1.147/28?",
      "options": [
        "A. 192.168.1.255",
        "B. 192.168.1.159",
        "C. 192.168.1.157",
        "D. 192.168.1.145"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 66,
      "question_text": "If PC1 receives an IPv6 address by using SLAAC, what is the network prefix length of the address assigned to PC1?",
      "options": [
        "A. 32",
        "B. 64",
        "C. 48",
        "D. 96"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 67,
      "question_text": "DAD allows a node to determine whether another node is already using an IPv6 address before it assigns that address to an interface. This ensures that duplicate unicast addresses are not present on a network. Which of the following packets does DAD use? (Choose two)",
      "options": [
        "A. NA",
        "B. NS",
        "C. RA",
        "D. RS"
      ],
      "correct_answers": [
        "A",
        "B"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 68,
      "question_text": "The figure illustrates a simplified enterprise campus-network topology... At this time, when SW1 receives an ARP request from PC2, it searches its MAC address table and forwards the request packet only through GE1/0/3.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "q68.png"
    },
    {
      "id": 69,
      "question_text": "If a network device has both a static route and a directly connected route to network 10.1.1.0/24, it prefers the direct route.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 70,
      "question_text": "In the network shown, all three PCs are members of VLAN 2. While configuring interface-based VLAN assignment, the administrator forgets only to configure the PVID of GE1/0/1. However, PC1 can still communicate with PC2 at Layer 2.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": "q70.png"
    },
    {
      "id": 71,
      "question_text": "OSPF uses five packet types. Which packet type notifies an OSPF neighbor about the LSAs it requires?",
      "options": [
        "A. LSU",
        "B. LSR",
        "C. DD",
        "D. Hello"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 72,
      "question_text": "Assume that the IP address of GE0/0/0 on R1 is 10.0.12.1/24. Several commands can enable OSPF on this interface. Match each command to its configuration view.",
      "type": "drag_drop",
      "drag_items": [
        "ospf 1",
        "area 0",
        "network 10.0.12.1 0.0.0.0",
        "ospf enable 1 area 0"
      ],
      "drop_targets": [
        {
          "target": "[R1-ospf-1]",
          "answer": "area 0"
        },
        {
          "target": "[R1]",
          "answer": "ospf 1"
        },
        {
          "target": "[R1-ospf-1-area-0.0.0.0]",
          "answer": "network 10.0.12.1 0.0.0.0"
        },
        {
          "target": "[R1-GE0/0/0]",
          "answer": "ospf enable 1 area 0"
        }
      ],
      "correct_answers": [
        "[R1-ospf-1] -> area 0",
        "[R1] -> ospf 1",
        "[R1-ospf-1-area-0.0.0.0] -> network 10.0.12.1 0.0.0.0",
        "[R1-GE0/0/0] -> ospf enable 1 area 0"
      ],
      "options": [
        "[R1-ospf-1] -> area 0",
        "[R1] -> ospf 1",
        "[R1-ospf-1-area-0.0.0.0] -> network 10.0.12.1 0.0.0.0",
        "[R1-GE0/0/0] -> ospf enable 1 area 0"
      ],
      "image": null
    },
    {
      "id": 73,
      "question_text": "Assume that IP addresses must be assigned from separate networks to four departments with 100, 50, 32, and 31 hosts, respectively. Assigning addresses from the 192.168.1.0/24 subnet cannot satisfy this requirement.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 74,
      "question_text": "Which types of IPv6 extension headers are available? (Choose four)",
      "options": [
        "A. Fragment header",
        "B. Routing header",
        "C. Destination Options header",
        "D. Hop-by-Hop Options header"
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
      "id": 75,
      "question_text": "PC1 at 192.168.1.1/24 and PC2 at 192.168.1.102/25 are directly connected by an Ethernet cable, and their network-port physical status is normal. They can communicate directly even though their subnet masks differ.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 76,
      "question_text": "In the switched network shown, STP is enabled on every device. SW1 is the root bridge, and the port costs are displayed. All other parameters remain at their default values. After the network has converged, which RPC value does SW3 calculate for its path to SW1?",
      "options": [
        "A. 100",
        "B. 150",
        "C. 50",
        "D. 90"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": "q76.png"
    },
    {
      "id": 77,
      "question_text": "In the switched network shown, STP is enabled on every device. SW1 is the root bridge, and the port costs are as shown. All other parameters use their default values. After the network stabilizes, which ports are alternate ports? (Choose two)",
      "options": [
        "A. GE1/0/3 of SW3",
        "B. GE1/0/3 of SW4",
        "C. GE1/0/2 of SW2",
        "D. GE1/0/1 of SW5"
      ],
      "correct_answers": [
        "B",
        "D"
      ],
      "type": "multiple",
      "image": "q77.png"
    },
    {
      "id": 78,
      "question_text": "Which of the following configurations can establish connectivity between interfaces on R1 and R3? (Choose two)",
      "options": [
        "A. [R3] ip route-static 10.0.0.0 24 20.1.1.2",
        "B. [R1] ip route-static 20.1.1.0 24 10.0.0.1",
        "C. [R2] ip route-static 20.1.1.0 24 10.0.0.2",
        "D. [R1] ip route-static 20.1.1.0 24 10.0.0.2"
      ],
      "correct_answers": [
        "A",
        "D"
      ],
      "type": "multiple",
      "image": "q78.png"
    },
    {
      "id": 79,
      "question_text": "In the OSPF network shown, R1 has a route to 10.0.0.0/30 whose default next hop is 30.1.1.2.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": "q79.png"
    },
    {
      "id": 80,
      "question_text": "R1 is configured as follows:\n\n[R1] radius-server template 1  \n[R1-radius-1] radius-server authentication 10.1.6.6 1812  \n[R1-radius-1] radius-server accounting 10.1.6.6 1813  \n[R1-radius-1] radius-server shared-key cipher YsHsjx_202206139  \n[R1-radius-1] quit  \n[R1] aaa  \n[R1-aaa] authentication-scheme auth1  \n[R1-aaa-authen-auth1] authentication-mode radius  \n[R1 aaa-authen-auth1] quit  \n[R1-aaa] accounting-scheme acc1  \n[R1 aaa accounting –acc1] accounting mode radius  \n[R1-aaa-accounting-acc1] quit  \n[R1 -aaa] domain huawei.com  \n[R1-aaa-domain-huawei.com] authentication-scheme auth1  \n[R1 aaa domain-huawei.com] accounting scheme acc1  \n[R1-aaa-domain-huawei.com] radius-server 1  \n[R1 aaa domain-huawel.com] quit  \n[R1-aaa] quit\n\nWhich of the following statements is correct?",
      "options": [
        "A. When a terminal initiates an authentication request, R1 needs to first establish a TCP connection with the server whose IP address is 10.1.6.6.",
        "B. When a terminal uses the user name test@huawei.com to initiate authentication, RADIUS authentication is used.",
        "C. RADIUS does not support accounting. Even if an accounting server is specified in the RADIUS server template, accounting cannot be performed when terminals access the network.",
        "D. The user cannot obtain authorization information after being authenticated because the IP address of the authorization server is not configured in the RADIUS server template."
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 81,
      "question_text": "When a Huawei network device operates as a Telnet server, which of the following might cause a client to fail to log in to the Telnet server? (Choose four)",
      "options": [
        "A. The source interface of the Telnet server is not configured on the device.",
        "B. The network between the device and the client is unreachable.",
        "C. The user interface for Telnet login is not configured on the device.",
        "D. The Telnet server function is not enabled on the device."
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
      "id": 82,
      "question_text": "Which of the following phases are necessary to establish a connection between an SSH server and an SSH client? (Choose four)",
      "options": [
        "A. Algorithm negotiation",
        "B. Version negotiation",
        "C. Key exchange",
        "D. User authentication"
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
      "id": 83,
      "question_text": "R1 has the following configuration:\n\n[R1] acl number 3000  \n[R1-acl4-advance-3000] rule 5 permit ip source 10.0.1.0 0.0.0.1  \n[R1-acl4-advance-3000] rule 10 deny ip source 0.0.1.0 15.0.0.3  \n[R1-acl4-advance-3000] rule 15 deny ip source 10.2.1.1 0  \n[R1-acl4-advance-3000] rule 20 permit ip  \n[R1-acl4-advance-3000] quit\n\nMatch each packet source IP address to its corresponding rule ID.",
      "type": "drag_drop",
      "drag_items": [
        "rule 5",
        "rule 10",
        "rule 15",
        "rule 20"
      ],
      "drop_targets": [
        {
          "target": "10.0.1.1",
          "answer": "rule 5"
        },
        {
          "target": "192.168.2.1",
          "answer": "rule 20"
        },
        {
          "target": "12.0.1.3",
          "answer": "rule 10"
        },
        {
          "target": "10.2.1.1",
          "answer": "rule 15"
        }
      ],
      "correct_answers": [
        "10.0.1.1 -> rule 5",
        "192.168.2.1 -> rule 20",
        "12.0.1.3 -> rule 10",
        "10.2.1.1 -> rule 15"
      ],
      "options": [
        "10.0.1.1 -> rule 5",
        "192.168.2.1 -> rule 20",
        "12.0.1.3 -> rule 10",
        "10.2.1.1 -> rule 15"
      ],
      "image": null
    },
    {
      "id": 84,
      "question_text": "The following ACL is configured on R1:\n\n[R1] acl 2001  \n[R1-acl4-bask-2001] rule permit source 192.168.1.3 0  \n[R1-acl4-bask-2001] rule deny source 192.168.1.3 0  \n[R1-acl4-bask-2001] quit\n\nIf R1 evaluates packets against ACL rules in ascending rule-ID order, hosts at 192.168.1.3/24 match the ACL permit rule.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 85,
      "question_text": "The following commands are configured on R1:\n\n[R1] acl number 2001  \n[R1-acl-number-2001] rule permit source 172.16.105.0 0.0.0.255  \n[R1-acl-number-2001] rule deny source any  \n[R1-acl-number-2001] quit  \n[R1] ftp server acl 2001\n\nBased on the preceding configuration, only hosts whose source IP addresses are in network segment 172.16.105.0/24 cannot access the FTP service on R1.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 86,
      "question_text": "The following ACL rule is configured on R1; however, no service module has invoked the rule:\n\n[R1] acl number 2001  \n[R1-acl4-basic-2001] rule permit source 172.16.105.0 0.0.0.255  \n[R1-acl4-basic-2001] rule deny source any  \n[R1-acl4-basic-2001] quit\n\nBy default, R1 permits only hosts in 172.16.105.0/24 to access R1.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 87,
      "question_text": "Enterprise data center (DC) services are no longer delivered by physical machines or provided solely to internal users. Instead, cloud platforms integrate resources in a unified way and deliver services to external users. Ongoing service innovation requires the DC construction model to evolve from a single DC to multi-site, multi-DC.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 88,
      "question_text": "In WLAN networking, multiple APs can broadcast the same SSID and belong to the same BSSID, allowing STAs to remain connected to the same wireless network wherever they move.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 89,
      "question_text": "While configuring wireless services on a Huawei WAC, you need to create a VAP profile and configure the country code, data forwarding mode, and service VLAN within that profile.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 90,
      "question_text": "In a centralized network architecture (WAC + Fit AP), Fit APs must go online before the WAC can manage and control them. Which of the following statements about the AP onboarding process are correct? (Choose three)",
      "options": [
        "A. DTLS encryption can be used during CAPWAP tunnel establishment.",
        "B. The AP and WAC exchange Echo packets to check the connectivity of the CAPWAP data tunnel.",
        "C. Before establishing a CAPWAP tunnel with the WAC, the AP must obtain the WAC’s CAPWAP address.",
        "D. If the MAC address of an AP is not in the whitelist, the AP cannot go online."
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
      "id": 91,
      "question_text": "With the release of Wi-Fi 7, wireless networks are now faster, more stable, and more latency-tolerant than ever. Which of the following frequency bands does Wi-Fi 7 support? (Choose three)",
      "options": [
        "A. 2.4 GHz",
        "B. 5 GHz",
        "C. 6 GHz",
        "D. 9.6 GHz"
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
      "id": 92,
      "question_text": "Radio waves are electromagnetic waves that have relatively high frequencies and short wavelengths within the electromagnetic spectrum.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 93,
      "question_text": "Which SNMP message does a managed device send unsolicited to the NMS to report urgent, significant events, such as the managed device restarting?",
      "options": [
        "A. Trap",
        "B. GetResponse",
        "C. InformResponse",
        "D. GetRequest"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 94,
      "question_text": "During WLAN deployment, a Fit AP cannot go online on the WAC. Which commands can be run on the WAC to locate the fault? (Choose two)",
      "options": [
        "A. display ap all",
        "B. display ap online-fail-record all",
        "C. display vap all",
        "D. display ssid-profile all"
      ],
      "correct_answers": [
        "A",
        "B"
      ],
      "type": "multiple",
      "image": null
    },
    {
      "id": 95,
      "question_text": "Both SNMP Trap and Inform Request are used by managed devices to send alarms to the NMS. An Inform Request requires acknowledgment from the NMS, while a Trap does not.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 96,
      "question_text": "Which method of Python’s paramiko SSHClient class can be used to send commands to a network device?",
      "options": [
        "A. connect()",
        "B. load_system_host_keys()",
        "C. open_sftp()",
        "D. exec_command()"
      ],
      "correct_answers": [
        "D"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 97,
      "question_text": "When planning VLANs for a campus network, VLAN IDs for distinct service types must be assigned consecutively, with no redundancy, to avoid gaps in future allocations.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 98,
      "question_text": "At the egress point of an enterprise campus network, which technology can an administrator deploy to permit only specified private IP addresses to access the Internet?",
      "options": [
        "A. SSH",
        "B. NAT",
        "C. FTP",
        "D. AAA"
      ],
      "correct_answers": [
        "B"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 99,
      "question_text": "A router ID uniquely identifies a device in an AS and must exist before the device can run OSPF. When a device runs OSPFv2 and no router ID is manually configured, the system automatically chooses one.",
      "options": [
        "A. TRUE",
        "B. FALSE"
      ],
      "correct_answers": [
        "A"
      ],
      "type": "single",
      "image": null
    },
    {
      "id": 100,
      "question_text": "When requesting an IPv4 address for the first time, a DHCPv4 client must exchange four messages with the DHCPv4 server. Drag the DHCPv4 packets to the correct positions according to the packet-interaction sequence.",
      "type": "drag_drop",
      "image": "q100.png",
      "drag_items": [
        "DHCP OFFER",
        "DHCP DISCOVER",
        "DHCP ACK",
        "DHCP REQUEST"
      ],
      "drop_targets": [
        {
          "target": "1",
          "answer": "DHCP DISCOVER"
        },
        {
          "target": "2",
          "answer": "DHCP OFFER"
        },
        {
          "target": "3",
          "answer": "DHCP REQUEST"
        },
        {
          "target": "4",
          "answer": "DHCP ACK"
        }
      ],
      "correct_answers": [
        "1 -> DHCP DISCOVER",
        "2 -> DHCP OFFER",
        "3 -> DHCP REQUEST",
        "4 -> DHCP ACK"
      ],
      "options": [
        "1 -> DHCP DISCOVER",
        "2 -> DHCP OFFER",
        "3 -> DHCP REQUEST",
        "4 -> DHCP ACK"
      ]
    },
    {
      "id": 101,
      "question_text": "An enterprise has deployed a Huawei WLAN, but some STAs cannot associate with wireless signals. To troubleshoot the problem, you log in to the WAC and run the relevant commands. The command output is shown below. Based on this output, which of the following could be causing the STA association failure?",
      "options": [
        "A. The STAs are not in the VAP's whitelist.",
        "B. The AP’s radios are not enabled.",
        "C. The channel utilization of the AP's radios is too high, and the air interface is busy.",
        "D. The STAs are in the global blacklist."
      ],
      "correct_answers": [
        "C"
      ],
      "type": "single",
      "image": "q101.png"
    }
  ]
};
