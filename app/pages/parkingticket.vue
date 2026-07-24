<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
  title: "Parking",
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

import type { ReportItem } from "~/types/report";

const { getReports } = useReports();

const reports = ref<ReportItem[]>([]);

onMounted(async () => {
  reports.value = await getReports();

  console.log("Reports:", reports.value);
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Reports</h2>
    </div>

    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th class="px-6 py-3 text-left">S.N.</th>
            <th class="px-4 py-3 text-left">Ticket No.</th>
            <th class="px-4 py-3 text-left">Vehicle</th>
            <th class="px-4 py-3 text-left">Type</th>
            <th class="px-4 py-3 text-left">Check In</th>
            <th class="px-4 py-3 text-left">Check Out</th>
            <!-- New -->
            <th class="px-4 py-3 text-left">Status</th>
            <th class="px-4 py-3 text-left">Hours</th>
            <th class="px-4 py-3 text-left">Amount</th>
            <th class="px-4 py-3 text-left">Attendant</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(report, index) in reports"
            :key="report._id"
            class="hover:bg-blue-50/40 transition-colors"
          >
            <td class="px-6 py-4">
              {{ index + 1 }}
            </td>

            <td class="px-4 py-4 font-medium">
              {{ report.ticketNumber }}
            </td>

            <td class="px-4 py-4">
              {{ report.vehicleNumber }}
            </td>

            <td class="px-4 py-4">
              {{ report.vehicleType }}
            </td>

            <td class="px-4 py-4">
              {{ formatDate(report.checkInTime) }}
            </td>
            <td class="px-4 py-4 text-gray-700">
              {{ report.checkOutTime ? formatDate(report.checkOutTime) : "-" }}
            </td>

            <td class="px-4 py-4">
              {{ report.status }}
            </td>

            <td class="px-4 py-4">
              {{ report.totalHours }}
            </td>

            <td class="px-4 py-4">Rs. {{ report.totalAmountPaid }}</td>

            <td class="px-4 py-4">
              {{ report.attendant.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

