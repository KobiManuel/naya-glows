"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import {
  useListEmailCampaignsQuery,
  useListNewsletterSubscribersQuery,
  useSendEmailCampaignMutation,
} from "../../../store/adminApi";
import { getApiErrorMessage } from "../../../store/apiError";

const inputClass =
  "w-full bg-white/70 border border-white/60 rounded-xl px-3.5 py-2.5 text-sm outline-none placeholder:text-[#16241a]/35 focus:border-[#8ab88e] transition-colors";

export default function AdminEmailCampaignsPage() {
  const { data: campaigns, isLoading } = useListEmailCampaignsQuery();
  const { data: subscribers } = useListNewsletterSubscribersQuery();
  const [sendCampaign, { isLoading: sending }] = useSendEmailCampaignMutation();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const recipientCount = subscribers?.length ?? 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendCampaign({ subject, message }).unwrap();
      toast.success(`Campaign sent to ${recipientCount} subscriber(s).`);
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Couldn't send the campaign."));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-light mb-1">Email Campaigns</h1>
      <p className="text-sm text-[#16241a]/50 mb-8">
        Compose a message and send it to every newsletter subscriber.
      </p>

      <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 mb-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[#16241a]/50 mb-2">
              Subject
            </label>
            <input
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's new at Naya Glows"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[#16241a]/50 mb-2">
              Message
            </label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your update — it'll be wrapped in our email template automatically."
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={sending || recipientCount === 0}
            className="self-start flex items-center gap-2 bg-[#16241a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#233324] transition-colors disabled:opacity-60"
          >
            <Send size={14} />
            {sending
              ? "Sending…"
              : recipientCount === 0
                ? "No subscribers yet"
                : `Send to ${recipientCount} subscriber(s)`}
          </button>
        </form>
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#16241a]/50 mb-4">
        Past Campaigns
      </h2>
      <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-sm text-[#16241a]/50">Loading…</p>
        ) : !campaigns || campaigns.length === 0 ? (
          <p className="p-6 text-sm text-[#16241a]/50">No campaigns sent yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#16241a]/45 border-b border-[#16241a]/10">
                <th className="p-4 font-medium">Subject</th>
                <th className="p-4 font-medium">Recipients</th>
                <th className="p-4 font-medium">Sent</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-[#16241a]/5 last:border-0">
                  <td className="p-4 font-medium">{c.subject}</td>
                  <td className="p-4 text-[#16241a]/60">{c.recipientCount}</td>
                  <td className="p-4 text-[#16241a]/60">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
