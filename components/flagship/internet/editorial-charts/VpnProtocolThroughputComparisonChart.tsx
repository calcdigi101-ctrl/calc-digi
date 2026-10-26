"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { ispSpeed: "100 Mbps", wireguard: 89, openvpnUdp: 76, openvpnTcp: 62, ikev2: 82 },
  { ispSpeed: "300 Mbps", wireguard: 268, openvpnUdp: 224, openvpnTcp: 182, ikev2: 245 },
  { ispSpeed: "500 Mbps", wireguard: 442, openvpnUdp: 365, openvpnTcp: 295, ikev2: 405 },
  { ispSpeed: "1000 Mbps", wireguard: 875, openvpnUdp: 680, openvpnTcp: 520, ikev2: 780 },
];

export function VpnProtocolThroughputComparisonChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        VPN Tunnel Protocol Throughput Retention Comparison (Mbps)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Delivered connection speeds across WireGuard (ChaCha20), OpenVPN UDP (AES-256), OpenVPN TCP, and IKEv2 protocols under equal conditions.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="ispSpeed" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="wireguard" name="WireGuard (Fastest)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ikev2" name="IKEv2 / IPsec" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="openvpnUdp" name="OpenVPN UDP" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="openvpnTcp" name="OpenVPN TCP" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
