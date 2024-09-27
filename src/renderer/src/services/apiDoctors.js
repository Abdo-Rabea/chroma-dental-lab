export async function createDoctor(fullName) {
  try {
    await window.doctors.createDoctor(fullName);
  } catch (err) {
    throw new Error('تعذر إضافة الطبيب');
  }
}

export async function getDoctors() {
  let doctors = [];
  try {
    doctors = await window.doctors.getDoctors();
  } catch (err) {
    throw new Error('تعذر تحميل بيانات الأطباء');
  }
  return doctors;
}
export async function getDoctorActiveBillById(doctorId) {
  try {
    return await window.doctors.getDoctorActiveBillById(doctorId);
  } catch (err) {
    throw new Error('تعذر تحميل بيانات الطبيب');
  }
}
