PROJECTS

- thumbnailer - gerador de thumbs para codeminer
- thumbnailer 2 - gerador de thumbnails para youtube
- mini-comfyui
- leitor de relatorios de fii (extensa do chrome)
- estudaqui on ai (ciclos de estudo)


MINI NETWORK

Perfect. Let’s lock everything we learned and redraw **one final, realistic roadmap** that:

* uses **Node.js on macOS**
* includes **iPhones as real (but constrained) routers**
* respects **CoreBluetooth limits**
* still teaches **actual networking**

This is the roadmap you can *actually finish*.

---

# 🧭 Bluetooth Mesh Network — Final Roadmap

### Node.js (macOS) + iOS (iPhone routers)

> **Network model:**
> Foreground, broadcast-based, best-effort, application-layer mesh.

---

## Phase 0 — Non-negotiable constraints (baseline)

### Accept upfront

* BLE advertising only (no connections)
* ≤ 31 bytes per packet
* iPhones route **only while app is foreground**
* No guarantees of delivery
* OS controls timing

This is your “physical layer”.

---

## Phase 1 — Protocol first (paper before code)

### Goal

Design a **language-agnostic protocol**.

### Tasks

* Define packet fields
* Define forwarding rules
* Define duplicate suppression rules
* Define packet types

### Output

A short `PROTOCOL.md` (your mini-RFC)

### Concepts

* Protocol vs implementation
* Wire format

---

## Phase 2 — Packet format (hard limit aware)

### Goal

Fit a real network packet in BLE constraints.

### Example layout (≤ 31 bytes)

```
| v | type | ttl | flags | src(4) | dst(4) | seq(2) | payload (≤14) |
```

### Tasks

* Binary encode/decode
* Validate size
* Reject malformed packets

### Concepts

* MTU
* Header trade-offs

---

## Phase 3 — macOS Node.js BLE link

### Goal

Turn BLE into a dumb broadcast pipe.

### Tasks

* Advertise raw packet buffers
* Scan and emit packet events
* No routing logic here

### Libraries

* `@abandonware/noble`
* `@abandonware/bleno`

### Exit

> Node process can send & receive packets.

---

## Phase 4 — Node router core (first real network)

### Goal

Make macOS nodes behave like routers.

### Routing rules

```
if seen(packet): drop
else if dst == me: deliver
else if ttl > 0: forward
```

### Tasks

* TTL decrement
* Duplicate cache
* Logging of hops

### Exit

> 2–3 Macs form a working mesh.

---

## Phase 5 — Routing strategies (Node only)

### Goal

Compare behaviors.

### Implement

* Flooding
* Gossip (p-based)
* Destination-hint forwarding

### Concepts

* Control traffic
* Efficiency vs reach

---

## Phase 6 — Observability (critical)

### Goal

See the network.

### Tasks

* Packet trace logs
* TTL decay visualization
* Optional web UI (WebSocket)

### Outcome

> You can *see* packets moving.

---

## Phase 7 — iOS BLE bridge app (no routing yet)

### Goal

Bring iPhones into the network safely.

### iOS app does:

* Advertise packets
* Scan packets
* Log everything

### Rules

❌ No routing logic yet
❌ Foreground only

### Exit

> iPhone can see macOS packets.

---

## Phase 8 — iOS router parity (minimal)

### Goal

Turn iPhones into real routers.

### Implement (same logic as Node):

* TTL decrement
* Duplicate suppression
* Forwarding rules

### Constraints

* Keep CPU low
* Expect packet loss

### Exit

> iPhone forwards packets between Macs.

---

## Phase 9 — Mixed-device mesh test

### Goal

Prove the network is device-agnostic.

### Test scenario

* Mac → iPhone → iPhone → Mac
* Devices in different rooms
* Observe hop count & drops

### Concepts

* Mobility
* Intermittent routing

---

## Phase 10 — Reliability experiments (optional)

### Goal

Learn why TCP exists.

### Tasks

* ACK packet type
* Retries with backoff
* Observe congestion collapse

### Expectation

It will break — that’s the lesson.

---

## Phase 11 — Minimal security (optional)

### Goal

Prevent trivial spoofing.

### Tasks

* HMAC over packet
* Drop invalid packets

### Trade-off

Payload space vs trust.

---

## Phase 12 — Reflection & documentation (mandatory)

### Deliverables

* PROTOCOL.md
* Diagrams:

  * packet flow
  * failure modes
* Notes:

  * macOS limits
  * iOS behavior
  * what surprised you

This is the **real output**.

---

## What you will *actually* have built

Not “Bluetooth internet”, but:

> **A delay-tolerant, opportunistic, broadcast mesh network**

That’s a real class of network used in:

* disaster comms
* sensor meshes
* early ad-hoc research

---

## Final sanity check

| Question                        | Answer             |
| ------------------------------- | ------------------ |
| Are Macs routers?               | ✅ Yes              |
| Are iPhones routers?            | ✅ Yes (foreground) |
| Is Node appropriate?            | ✅ Very             |
| Is this realistic on macOS+iOS? | ✅ Yes              |
| Will it teach real networking?  | 🔥 Absolutely      |

---

## The next *correct* step

Before any code, we should now **lock Phase 1 & 2**:

👉 **Write the packet spec + forwarding rules as if it were an RFC.**

That guarantees:

* Node & iOS stay compatible
* You don’t redesign mid-way

If you want, next message we can:

* write `PROTOCOL.md`
* design the exact binary layout
* or sketch the router state machine

Tell me which one you want to do next.

