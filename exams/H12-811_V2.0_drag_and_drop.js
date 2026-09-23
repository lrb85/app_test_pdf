window.examData_H12_811_V2_0_drag_and_drop = {
  "exam_code": "H12-811_V2.0_drag_and_drop",
  "exam_name": "HCIA-Datacom V2.0 - Drag and Drop",
  "provider": "Huawei",
  "version": "v2026-09-23",
  "questions": [
    {
      "id": 1,
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
      "id": 2,
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
      "id": 3,
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
      "id": 4,
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
      "id": 5,
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
      "id": 6,
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
      "id": 7,
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
      "id": 8,
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
      "id": 9,
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
      "id": 10,
      "question_text": "You define the following function in Python:\n\ndef add(a, b, c)  \nreturn a + b + c\n\nYou then add the following code. To ensure the code executes correctly, arrange the code in sequence.",
      "type": "drag_drop",
      "drag_items": [
        "a = 3",
        "b = a + 3",
        "c = a + b",
        "print(add(a,b,c))"
      ],
      "drop_targets": [
        {
          "target": "1",
          "answer": "a = 3"
        },
        {
          "target": "2",
          "answer": "b = a + 3"
        },
        {
          "target": "3",
          "answer": "c = a + b"
        },
        {
          "target": "4",
          "answer": "print(add(a,b,c))"
        }
      ],
      "correct_answers": [
        "1 -> a = 3",
        "2 -> b = a + 3",
        "3 -> c = a + b",
        "4 -> print(add(a,b,c))"
      ],
      "options": [
        "1 -> a = 3",
        "2 -> b = a + 3",
        "3 -> c = a + b",
        "4 -> print(add(a,b,c))"
      ],
      "image": null
    }
  ]
};
