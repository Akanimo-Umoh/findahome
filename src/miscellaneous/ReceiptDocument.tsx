// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

// const styles = StyleSheet.create({
//   page: { padding: 32, fontSize: 11, fontFamily: "Helvetica" },
//   heading: { fontSize: 16, marginBottom: 12 },
//   section: { marginBottom: 16 },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 4,
//   },
//   label: { color: "#6b7280" },
// })

// type ReceiptDocumentProps = {
//   propertyName: string
//   propertyRef: string
//   users: { title: string; text: string }[]
//   transactionDetails: { title: string; text: string }[]
//   timelines: { title: string; date: string }[]
// }

// export function ReceiptDocument({
//   propertyName,
//   propertyRef,
//   users,
//   transactionDetails,
//   timelines,
// }: ReceiptDocumentProps) {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.heading}>Transaction Receipt</Text>
//         <Text style={{ marginBottom: 16 }}>
//           {propertyName} — {propertyRef}
//         </Text>

//         <View style={styles.section}>
//           {users.map((u) => (
//             <View key={u.title} style={styles.row}>
//               <Text style={styles.label}>{u.title}</Text>
//               <Text>{u.text}</Text>
//             </View>
//           ))}
//         </View>

//         <View style={styles.section}>
//           {transactionDetails.map((d) => (
//             <View key={d.title} style={styles.row}>
//               <Text style={styles.label}>{d.title}</Text>
//               <Text>{d.text}</Text>
//             </View>
//           ))}
//         </View>

//         <View style={styles.section}>
//           {timelines.map((t) => (
//             <View key={t.title} style={styles.row}>
//               <Text>{t.title}</Text>
//               <Text style={styles.label}>{t.date}</Text>
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   )
// }
