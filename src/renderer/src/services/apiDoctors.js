export async function getDoctors() {
  let doctors = [];
  try {
    doctors = await window.doctors.getDoctors();
  } catch (err) {
    throw new Error('تعذر تحميل بيانات الأطباء');
  }
  return doctors;
}
